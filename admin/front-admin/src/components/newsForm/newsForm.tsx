import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  ImageList,
  ImageListItem,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import Grid from "@mui/material/Unstable_Grid2";
import { useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import callApi from "../../api/api";
import FolderIcon from "@mui/icons-material/Folder";

type Inputs = {
  title: string;
  description: string;
  images: FileList;
};

const NewsForm = (props: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ defaultValues: props.data });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    props.submitHandler(data);
  };
  const [loadedImages, setLoadedImages] = useState(
    props.data ? props.data.Image : null
  );
  const [loadedDocs, setLoadedDocs] = useState(
    props.data ? props.data.Document : null
  );
  const [imageOpen, setImageOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<string | null>(null);
  const [docsOpen, setDocsOpen] = useState(false);
  const [docIndex, setDocIndex] = useState(-1);
  const [docToDelete, setDocToDelete] = useState<string | null>(null);
  const [imageIndex, setImageIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const handleDeleteImage = (imageId: string, index: number) => {
    setImageToDelete(imageId);
    setImageIndex(index);
    setDeleteDialogOpen(true);
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

  const handleDeleteDoc = (docId: string, index: number) => {
    setDocToDelete(docId);
    setDocIndex(index);
    setDeleteDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDeleteDialogOpen(false);
    setImageToDelete(null);
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
            1
          </span>
          {props.data ? "Uređivanje novosti" : "Kreiranje novosti"}
        </Typography>
        <Grid container spacing={1} padding={"1rem"}>
          <Grid xs={12} container spacing={3}>
            <Grid xs={12}>
              <TextField
                label="Naslov"
                error={errors.title as unknown as boolean}
                helperText={errors.title ? "Ovo polje je obavezno" : ""}
                fullWidth
                {...register("title", { required: true })}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} xs={12}>
            <Grid xs={12}>
              <TextField
                label="Tekst"
                fullWidth
                multiline
                error={Boolean(errors.description)}
                helperText={errors.description ? "Ovo polje je obavezno" : ""}
                minRows={8}
                maxRows={10}
                {...register("description", { required: true })}
              />
            </Grid>
            <Grid xs={12} justifyContent={"flex-start"}>
              {props.data && (
                <Box sx={{ marginBottom: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={() => setImageOpen(!imageOpen)}
                    endIcon={
                      imageOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />
                    }
                    fullWidth
                  >
                    {imageOpen ? "Sakrij fotografije" : "Prikaži fotografije"}
                  </Button>
                  <Collapse in={imageOpen}>
                    {props.data.Image && (
                      <Box
                        sx={{
                          maxHeight: 200,
                          overflowY: "auto",
                          marginBottom: 2,
                          marginTop: 2,
                        }}
                      >
                        <ImageList cols={3} gap={8}>
                          {Array.from(props.data.Image).map(
                            (img: any, index: number) => (
                              <ImageListItem key={index}>
                                {loadedImages[index] ? (
                                  <img
                                    referrerPolicy="no-referrer"
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
                                  onClick={() =>
                                    handleDeleteImage(img.id, index)
                                  }
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
              {props.data && props.data.Document.length > 0 && (
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
                        {props.data.Document.map((doc: any, index: number) => (
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
                            <ListItemText
                              primary={doc.name}
                              secondary={"PDF"}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </Collapse>
                </>
              )}
              <InputLabel>Fotografije i PDF</InputLabel>
              <TextField
                type="file"
                error={Boolean(errors.images)}
                inputProps={{
                  accept: "image/*, application/pdf",
                  multiple: true,
                }}
                {...register("images", {})}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
            </Grid>
          </Grid>

          <Grid xs={12}>
            <Button type="submit" variant="contained" fullWidth>
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
            Da li ste sigurni da želite obrisati ovu sliku?
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
};

export default NewsForm;
