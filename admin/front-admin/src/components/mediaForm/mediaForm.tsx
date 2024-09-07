import { useEffect, useRef, useState } from "react";
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
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Grid from "@mui/material/Unstable_Grid2";
import callApi from "../../api/api";

type Inputs = {
  image: FileList;
  videoUrls: { url: string }[];
};

export default function MediaForm(props: any) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: { videoUrls: props.data?.videoUrls },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "videoUrls",
  });

  // useEffect(() => {
  //   props.data.videoUrls.forEach((element: any) => {
  //     append(element.videoURL);
  //   });
  // }, []);
  const [loadedImages, setLoadedImages] = useState(
    props.data ? props.data.image : null
  );
  const [imageOpen, setImageOpen] = useState(false); // State to control image dropdown
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<string | null>(null);
  const [imageIndex, setImageIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const handleDeleteImage = (imageId: string, index: number) => {
    setImageToDelete(imageId);
    setImageIndex(index);
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
        const response = await callApi.Upload.deleteImage(imageToDelete);
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
  // if (props.data)
  //   useEffect(() => {
  //     setLoadedImages(new Array(props.data.image.length).fill(false));

  //     if (props.data?.videoUrls) {
  //       props.data.videoUrls.forEach((videoUrl: any) => append(videoUrl));
  //     }
  //   }, [props.data, append, setValue]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    props.submitHandler(data);
  };

  // const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  // if (props.data)
  //   useEffect(() => {
  //     const observer = new IntersectionObserver(
  //       (entries) => {
  //         entries.forEach((entry) => {
  //           if (entry.isIntersecting) {
  //             const index = parseInt(entry.target.getAttribute("data-index")!);
  //             setLoadedImages((prev) => {
  //               const newLoadedImages = [...prev];
  //               newLoadedImages[index] = true;
  //               return newLoadedImages;
  //             });
  //             observer.unobserve(entry.target);
  //           }
  //         });
  //       },
  //       {
  //         rootMargin: "100px",
  //       }
  //     );

  //     imageRefs.current.forEach((img) => img && observer.observe(img));

  //     return () => observer.disconnect();
  //   }, [props.data.image]);
  console.log(props.data);
  console.log(fields);
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
            3
          </span>
          Fotografije i video snimci
        </Typography>

        {props.data.image.length > 0 && (
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

        {/* File Upload */}
        <Grid container spacing={1}>
          <Grid xs={12}>
            <TextField
              type="file"
              inputProps={{ accept: "image/*", multiple: true }}
              {...register("image", { required: !props.data })}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            {errors.image && <span>This field is required</span>}
          </Grid>

          {/* Dynamically add YouTube video URLs */}
          {fields.map((field, index) => {
            return (
              <Grid container xs={12} key={field.id} alignItems="center">
                <Grid xs={10}>
                  <TextField
                    label={`YouTube Video URL ${index + 1}`}
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
                  {errors.videoUrls?.[index]?.url && (
                    <span>This field is required</span>
                  )}
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

          {/* Add Another Video Button */}
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

          {/* Navigation Buttons */}
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
            Da li ste sigurni da želite obrisati ovu sliku?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Otkaži
          </Button>
          <Button onClick={confirmDeleteImage} color="error" autoFocus>
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
