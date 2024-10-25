import { styled, useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { useLoaderData, useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { TouristSpotData } from "../../pages/touristSpots/touristSpotsPage";
import VisibilityIcon from "@mui/icons-material/Visibility";
import callApi from "../../api/api";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#010400",
    color: "#90CAF9",
    textAlign: "center",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: "center",
    width: "33%",
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const CustomizedTables = ({ data }: { data: TouristSpotData[] }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const [displayAlert, setDisplayAlert] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const tableData = useLoaderData() as any;
  const handleClickOpen = (title: string, id: string) => {
    setTitle(title);
    setId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();

  const handleDelete = async () => {
    handleClose();
    try {
      await callApi.TouristSpots.deleteSpot(id);
      navigate(".");
      setDisplayAlert(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Alert
        severity="success"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => setDisplayAlert(false)}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{
          position: "fixed",
          bottom: "20px",
          left: displayAlert ? "20px" : "-300px",
          zIndex: "3000",
          transition: "left 1s ease-in-out, opacity 1s ease-in-out",
          opacity: displayAlert ? 1 : 0,
          pointerEvents: displayAlert ? "auto" : "none",
        }}
      >
        Uspješno ste izbrisali turističku destinaciju
      </Alert>
      {data && data.length > 0 ? (
        <Paper
          square={false}
          elevation={1}
          sx={{ width: "100%", overflowX: "auto" }}
        >
          <Table
            sx={{ minWidth: 700, width: "100%", display: "block" }}
            aria-label="customized table"
            stickyHeader
          >
            <TableHead sx={{ position: "sticky", top: 0, left: 0 }}>
              <TableRow>
                {Object.keys((tableData as any)[0]).map((item, index) => {
                  if (item[0] >= "A" && item[0] <= "Z")
                    return (
                      <StyledTableCell align="right" key={index}>
                        {item}
                      </StyledTableCell>
                    );
                })}
                <StyledTableCell align="right"></StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row: any, index: number) => (
                <StyledTableRow key={index} hover>
                  {Object.values(row).map((dataItem, itemIndex) => {
                    if (itemIndex != 0)
                      return (
                        <StyledTableCell key={itemIndex} align="right">
                          {dataItem as string}
                        </StyledTableCell>
                      );
                  })}
                  <StyledTableCell
                    align="right"
                    onClick={() => {
                      navigate("/view/" + row.id);
                    }}
                  >
                    <VisibilityIcon />
                  </StyledTableCell>
                  <StyledTableCell
                    align="right"
                    onClick={() => {
                      navigate("/dashboard/editSpot/" + row.id);
                    }}
                  >
                    <EditIcon />
                  </StyledTableCell>
                  <StyledTableCell
                    align="right"
                    onClick={() => {
                      handleClickOpen(row.Ime, row.id);
                    }}
                  >
                    <DeleteIcon />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              {"Brisanje " + title}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Da li želite da izbrišete ovu destinaciju?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose}>
                OTKAŽI
              </Button>
              <Button onClick={() => handleDelete()} color="error">
                IZBRIŠI
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      ) : (
        <div>
          <h2>Nema turističkih destinacija za prikaz.</h2>
          <a href="http://localhost:5173/dashboard/createSpot">
            Kliknite ovdje da dodate turističku destinaciju.
          </a>
        </div>
      )}
    </>
  );
};

export default CustomizedTables;
