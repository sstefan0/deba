import { useState } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  ImageList,
  ImageListItem,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  FormLabel,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Grid from "@mui/material/Unstable_Grid2";
import callApi from "../../api/api";
import FolderIcon from "@mui/icons-material/FileCopy";

type Inputs = {
  image: FileList;
  videoUrls: { url: string }[];
};

export default function MediaForm(props: any) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: { videoUrls: props.data?.videoUrls },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "videoUrls",
  });

  const [loadedImages, setLoadedImages] = useState(
    props.data ? props.data.image : null
  );
  const [loadedDocs, setLoadedDocs] = useState(
    props.data ? props.data.docs : null
  );
  const [docIndex, setDocIndex] = useState(-1);
  const [imageOpen, setImageOpen] = useState(false);
  const [docsOpen, setDocsOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<string | null>(null);
  const [docToDelete, setDocToDelete] = useState<string | null>(null);
  const [imageIndex, setImageIndex] = useState(-1);
  const [loading, setLoading] = useState(false);

  const handleDeleteImage = (imageId: string, index: number) => {
    setImageToDelete(imageId);
    setImageIndex(index);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDoc = (docId: string, index: number) => {
    setDocToDelete(docId);
    setDocIndex(index);
    setDeleteDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDeleteDialogOpen(false);
    setImageToDelete(null);
  };

  const confirmDeleteImage = async () => {
    if (imageToDelete) {
      try {
        setLoading(true);
        await callApi.Upload.deleteImage(imageToDelete);
        setDeleteDialogOpen(false);
        setImageToDelete(null);
        const newArray = loadedImages;
        newArray.splice(imageIndex, 1);
        setLoadedImages(newArray);
        setImageIndex(-1);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
  };

  const confirmDeleteDocument = async () => {
    if (docToDelete) {
      try {
        setLoading(true);
        await callApi.Upload.deleteFile(docToDelete);
        setDeleteDialogOpen(false);
        setDocToDelete(null);
        const newArray = loadedDocs;
        newArray.splice(docIndex, 1);
        setLoadedDocs(newArray);
        setDocIndex(-1);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    props.submitHandler(data);
  };
  const validateFiles = (files: any) => {
    const hasImage = Array.from(files).some((file: any) =>
      file.type.startsWith("image/")
    );
    return hasImage || Boolean(props.data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
      <Box sx={{ flexGrow: 1, width: "100%", padding: "1rem" }}>
        <Typography
          variant="h4"
          textAlign={"left"}
          sx={{ padding: "0 0 5% 0" }}
        >
          <span
            style={{
              background: "gray",
              padding: "10px 20px",
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              marginRight: "10px",
            }}
          >
            3
          </span>
          Fotografije, PDF i video snimci
        </Typography>

        {props.data && props.data.image.length > 0 && (
          <Box sx={{ marginBottom: 2 }}>
            <Button
              variant="outlined"
              onClick={() => setImageOpen(!imageOpen)}
              endIcon={imageOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              fullWidth
            >
              {imageOpen ? "Sakrij fotografije" : "Prikaži fotografije"}
            </Button>
            <Collapse in={imageOpen}>
              {props.data.image && (
                <Box
                  sx={{
                    maxHeight: 200,
                    overflowY: "auto",
                    marginBottom: 2,
                    marginTop: 2,
                  }}
                >
                  <ImageList cols={3} gap={8}>
                    {Array.from(props.data.image).map(
                      (img: any, index: number) => (
                        <ImageListItem key={index}>
                          {loadedImages[index] ? (
                            <img
                              src={img.imageURL}
                              alt={`Image ${index + 1}`}
                              style={{ width: "100%", height: "auto" }}
                            />
                          ) : (
                            <div
                              style={{
                                height: "100px",
                                backgroundColor: "#f0f0f0",
                              }}
                              data-index={index}
                            />
                          )}
                          <IconButton
                            onClick={() => handleDeleteImage(img.id, index)}
                            color="error"
                            sx={{
                              position: "absolute",
                              top: 0,
                              right: 0,
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ImageListItem>
                      )
                    )}
                  </ImageList>
                </Box>
              )}
            </Collapse>
          </Box>
        )}
        {props.data && props.data.docs.length > 0 && (
          <>
            <Button
              variant="outlined"
              onClick={() => setDocsOpen(!docsOpen)}
              endIcon={docsOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              fullWidth
            >
              {imageOpen ? "Sakrij pdf datoteke" : "Prikaži pdf datoteke"}
            </Button>
            <Collapse in={docsOpen}>
              <Box
                sx={{
                  maxHeight: 200,
                  overflowY: "auto",
                  marginBottom: 2,
                  marginTop: 2,
                }}
              >
                <List dense={false}>
                  {props.data.docs.map((doc: any, index: number) => (
                    <ListItem
                      secondaryAction={
                        <IconButton
                          onClick={() => handleDeleteDoc(doc.id, index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <FolderIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={doc.name} secondary={"PDF"} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Collapse>
          </>
        )}

        <Grid container spacing={1}>
          <Grid xs={12}>
            <FormLabel
              sx={{ textAlign: "left", width: "100%", display: "block" }}
            >
              Fotografije i PDF
            </FormLabel>
            <TextField
              type="file"
              error={Boolean(errors.image)}
              helperText={
                errors.image ? "Dodajte najmanje jednu fotografiju" : ""
              }
              inputProps={{
                accept: "image/*, application/pdf",
                multiple: true,
              }}
              {...register("image", { validate: validateFiles })}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            {errors.image && (
              <span>Morate dodati najmanje jednu fotografiju</span>
            )}
          </Grid>

          {fields.map((field, index) => {
            return (
              <Grid container xs={12} key={field.id} alignItems="center">
                <Grid xs={10}>
                  <TextField
                    label={`YouTube Video URL ${index + 1}`}
                    error={!!errors.videoUrls?.[index]?.url}
                    helperText={
                      !!errors.videoUrls?.[index]?.url
                        ? "Ovo polje je obavezno"
                        : ""
                    }
                    {...register(`videoUrls.${index}.url`, {
                      required: true,
                    })}
                    fullWidth
                    sx={{ marginBottom: 2 }}
                    defaultValue={
                      props.data
                        ? props.data.videoUrls.length > index
                          ? props.data.videoUrls[index].videoURL
                          : ""
                        : ""
                    }
                  />
                </Grid>
                <Grid xs={2} sx={{ textAlign: "center" }}>
                  <IconButton
                    onClick={() => remove(index)}
                    color="error"
                    sx={{ marginBottom: 2 }}
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                </Grid>
              </Grid>
            );
          })}

          <Grid xs={12}>
            <Button
              variant="outlined"
              onClick={() => append({ url: "" })}
              startIcon={<AddCircleOutlineIcon />}
              fullWidth
            >
              Dodaj YouTube Video
            </Button>
          </Grid>

          <Grid xs={6}>
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              onClick={props.prevHandler}
            >
              Nazad
            </Button>
          </Grid>
          <Grid xs={6}>
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Potvrdi
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="confirm-delete-dialog"
        aria-describedby="confirm-delete-description"
      >
        <DialogTitle id="confirm-delete-dialog">Potvrda brisanja</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-delete-description">
            Da li ste sigurni da želite obrisati ovu{" "}
            {imageToDelete ? "fotografiju" : "datoteku"}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Otkaži
          </Button>
          <Button
            onClick={imageToDelete ? confirmDeleteImage : confirmDeleteDocument}
            color="error"
            autoFocus
          >
            {loading ? (
              <CircularProgress
                size={24}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            ) : (
              "Obriši"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
}
