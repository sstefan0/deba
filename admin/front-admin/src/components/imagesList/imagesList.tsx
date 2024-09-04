import Paper from "@mui/material/Paper";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { CustomScroll } from "react-custom-scroll";
import { useState } from "react";
import { Box, Modal } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxHeight: "90vh",
  maxWidth: "100%",
  bgcolor: "#121212",
  border: "2px solid #121212",
  boxShadow: 24,
};
const ImagesList = (props: any) => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");
  const handleOpen = (image: string) => {
    setImage(image);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const itemData = props.images;
  return (
    <>
      <CustomScroll>
        <Paper
          square={false}
          elevation={1}
          sx={{
            width: "100%",
            height: "auto",
            maxHeight: "300",
          }}
        >
          <ImageList variant="masonry" cols={3} gap={8}>
            {itemData.map((item: any) => (
              <ImageListItem
                key={item.imageURL}
                onClick={() => {
                  handleOpen(item.imageURL);
                }}
              >
                <img
                  srcSet={`${item.imageURL}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.imageURL}?w=248&fit=crop&auto=format`}
                  alt={""}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Paper>
      </CustomScroll>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img
            src={image}
            style={{ maxWidth: "90vw", maxHeight: "90vh" }}
          ></img>
        </Box>
      </Modal>
    </>
  );
};

export default ImagesList;
