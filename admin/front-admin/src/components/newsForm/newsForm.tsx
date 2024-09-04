import {
  Box,
  Button,
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
  const [imageOpen, setImageOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<string | null>(null);
  const [imageIndex, setImageIndex] = useState(-1);
  const handleDeleteImage = (imageId: string, index: number) => {
    setImageToDelete(imageId);
    setImageIndex(index);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteImage = async () => {
    if (imageToDelete) {
      try {
        const response = await callApi.Upload.deleteImage(imageToDelete);
        setDeleteDialogOpen(false);
        setImageToDelete(null);
        const newArray = loadedImages.splice(imageIndex, 1);
        setLoadedImages(newArray);
        setImageIndex(-1);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleCloseDialog = () => {
    setDeleteDialogOpen(false);
    setImageToDelete(null);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
      <Box sx={{ flexGrow: 1, width: "100%" }}>
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
        <Grid container spacing={1}>
          <Grid xs={12} container spacing={3}>
            <Grid xs={12}>
              <TextField
                label="Naslov"
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
                minRows={8}
                maxRows={10}
                {...register("description", { required: true })}
              />
            </Grid>
            <Grid xs={12} justifyContent={"flex-start"}>
              {/* Image Dropdown */}
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
              <InputLabel>Fotografije</InputLabel>
              <TextField
                type="file"
                inputProps={{ accept: "image/*", multiple: true }}
                {...register("images", { required: !props.data })}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              {errors.images && <span>This field is required</span>}
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
          <Button onClick={confirmDeleteImage} color="error" autoFocus>
            Obriši
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default NewsForm;
