import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { Paper, Switch } from "@mui/material";
import { TouristSpotData } from "../../pages/touristSpots/touristSpotsPage";
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
    width: "150px",
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const CustomizedTables = ({ data }: { data: TouristSpotData[] }) => {
  const navigate = useNavigate();
  // Object.keys()

  return data && data.length > 0 ? (
    <Paper
      square={false}
      elevation={1}
      sx={{ width: "100%", overflowX: "auto" }}
    >
      <Table
        sx={{ minWidth: 700, width: "100%" }}
        aria-label="customized table"
        stickyHeader
      >
        <TableHead sx={{ position: "sticky", top: 0, left: 0 }}>
          <TableRow>
            <StyledTableCell align="right">Ime</StyledTableCell>
            <StyledTableCell align="right">Prezime</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Lozinka</StyledTableCell>
            <StyledTableCell align="right">Tip korisnika</StyledTableCell>
            <StyledTableCell align="right">Aktivan</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: any, index: number) => (
            <StyledTableRow key={index} hover>
              {Object.values(row).map((dataItem, itemIndex) => {
                if (itemIndex != 0 && itemIndex != 6) {
                  if (itemIndex === 4)
                    return (
                      <StyledTableCell key={itemIndex} align="right">
                        ••••••••
                      </StyledTableCell>
                    );
                  else
                    return (
                      <StyledTableCell key={itemIndex} align="right">
                        {dataItem as string}
                      </StyledTableCell>
                    );
                }
              })}
              <StyledTableCell align="right" onClick={() => {}}>
                <Switch
                  defaultChecked={row.active}
                  onChange={async (e) => {
                    await callApi.Auth.toggleActive(row.id);
                  }}
                ></Switch>
              </StyledTableCell>
              <StyledTableCell
                align="right"
                onClick={() => {
                  navigate("/uredinalog/" + row.id);
                }}
              >
                <EditIcon />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  ) : (
    <div>
      <h2>Nema kreiranih naloga.</h2>
    </div>
  );
};

export default CustomizedTables;
