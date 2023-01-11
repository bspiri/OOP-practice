import React, { useState, useEffect } from "react";
import { Data } from "./Data";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableContainer,
  Paper,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  CardHeader,
  Box,
} from "@mui/material";

const names = Data["names"];
const sites = Data["sites"];
const countries = Data["countries"];
const leagues = Data["leagues"];
const messages = Data["messages"];

function randomID(length) {
  let result = "";
  const characters = "0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; ++i)
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  return parseFloat(result);
}

function randomDate() {
  const start = new Date("10-10-2018 23:45"),
    end = new Date("12-07-2022 00:10");
  const diff = end.getTime() - start.getTime();
  const new_diff = diff * Math.random();
  return new Date(start.getTime() + new_diff);
}

function randomBool(chance) {
  return Math.random() < chance;
}

function randomEntry(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function limitMessage(str) {
  if (str.length > 20) {
    return str.substr(0, 19) + "...";
  }
}

class Message {
  constructor(id) {
    this.id = id;
    this.message = randomEntry(messages);
    this.site = randomEntry(sites);
    this.user = randomEntry(names);
    this.msgID = randomID(7);
    this.stamp = randomDate().getTime();
    this.comment = randomEntry(messages);
    this.error = randomBool(0.1)
      ? [
          `{\"error\":\"Forbidden\",\"data\":[],\"serverTime\":\"${randomDate().toISOString()}\"}`,
        ]
      : null;
  }
}

class User {
  constructor(id) {
    this.id = id;
    this.url = `https://picsum.photos/100/100?random=${parseInt(
      Math.random() * 250 + 1
    )}`;
    this.country = randomEntry(countries);
    this.points = parseInt(Math.random() * 100000);
    this.isGold = randomBool(0.5);
    this.stamp = randomDate().getTime();
    this.ranking = {
      league: randomEntry(leagues),
      level: parseInt(Math.random() * 100 + 1),
    };
    this.name = names[Math.floor(Math.random() * names.length)];
  }
}

const tableCellStyling = {
  color: "#ffffff",
  fontWeight: "bold",
  fontSize: "1em",
  border: "0.5px white solid",
};

export default function GenerateTable() {
  const [messagesArray, setMessagesArray] = useState([]);
  const [usersArray, setUsersArray] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState();

  useEffect(() => {
    const random = randomNumber(1, 20);
    for (let i = 0; i < random; i++) {
      const userId = randomID(5);
      const messagesObj = new Message(userId);
      const usersObj = new User(userId);
      setMessagesArray((current) => [...current, messagesObj]);
      setUsersArray((current) => [...current, usersObj]);
    }
  }, []);

  const handleClickOpen = (id) => {
    setSelectedMessage(id);
  };

  const handleClose = () => {
    setSelectedMessage(0);
  };

  return (
    <Box
      p={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }}
      sx={{
        border: "1px solid grey",
        boxShadow: 1,
        borderRadius: 2,
        backgroundColor: "#f4fdf4",
      }}
    >
      <Paper>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow
                sx={{
                  whiteSpace: "nowrap",
                  backgroundColor: "#009879",
                }}
              >
                <TableCell
                  sx={{
                    ...tableCellStyling,
                  }}
                >
                  Message.date
                </TableCell>
                <TableCell sx={{ ...tableCellStyling }} align="right">
                  User.name
                </TableCell>
                <TableCell
                  sx={{
                    ...tableCellStyling,
                  }}
                  align="right"
                >
                  User.ranking.level
                </TableCell>
                <TableCell
                  sx={{
                    ...tableCellStyling,
                  }}
                  align="right"
                >
                  Message.site
                </TableCell>
                <TableCell
                  sx={{
                    ...tableCellStyling,
                  }}
                  align="right"
                >
                  Message.user
                </TableCell>
                <TableCell
                  sx={{
                    ...tableCellStyling,
                  }}
                  align="right"
                >
                  Message preview
                </TableCell>
                <TableCell
                  sx={{
                    ...tableCellStyling,
                  }}
                  align="right"
                >
                  Comment preview
                </TableCell>
                <TableCell
                  sx={{
                    ...tableCellStyling,
                  }}
                  salign="right"
                >
                  Message.errors
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {messagesArray.map((message) => {
                const user = usersArray.find((user) => message.id === user.id);
                const display =
                  message.id === selectedMessage ? "table-row" : "none";
                const messagePreview = limitMessage(message.message);
                const commentPreview = limitMessage(message.comment);
                const formattedMessageDate = new Date(
                  message.stamp
                ).toUTCString();
                const formattedUserDate = new Date(user.stamp).toUTCString();
                let errorText;
                if (message.error) {
                  errorText = `Error: ${message.error}`;
                } else errorText = "Error: No error";

                return (
                  <React.Fragment key={"fragment" + message.id}>
                    <TableRow
                      key={message.id}
                      onClick={() => handleClickOpen(message.id)}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {formattedMessageDate}
                      </TableCell>
                      <TableCell align="right">{user.name}</TableCell>
                      <TableCell align="right">{user.ranking.level}</TableCell>
                      <TableCell align="right">{message.site}</TableCell>
                      <TableCell align="right">{message.user}</TableCell>
                      <TableCell align="right">{messagePreview}</TableCell>
                      <TableCell align="right">{commentPreview}</TableCell>
                      <TableCell align="left">{message.error}</TableCell>
                    </TableRow>
                    <TableRow key={"detail" + message.id} sx={{ display }}>
                      <TableCell component="th" scope="row" colSpan={8}>
                        <Card sx={{ maxWidth: 345 }}>
                          <CardHeader title="Message Details" />
                          <CardContent>
                            <Typography
                              sx={{ pb: 1 }}
                              variant="body2"
                              color="text.secondary"
                            >
                              Message: {message.message}
                            </Typography>
                            <Typography
                              sx={{ pb: 1 }}
                              variant="body2"
                              color="text.secondary"
                            >
                              Site: {message.site}
                            </Typography>
                            <Typography
                              sx={{ pb: 1 }}
                              variant="body2"
                              color="text.secondary"
                            >
                              User: {message.user}
                            </Typography>
                            <Typography
                              sx={{ pb: 1 }}
                              variant="body2"
                              color="text.secondary"
                            >
                              msgID: {message.msgID}
                            </Typography>
                            <Typography
                              sx={{ pb: 1 }}
                              variant="body2"
                              color="text.secondary"
                            >
                              Date: {formattedMessageDate}
                            </Typography>
                            <Typography
                              sx={{ pb: 1 }}
                              variant="body2"
                              color="text.secondary"
                            >
                              Comment: {message.comment}
                            </Typography>
                            <Typography
                              sx={{ pb: 1 }}
                              variant="body2"
                              color="text.secondary"
                            >
                              {errorText}
                            </Typography>
                          </CardContent>
                          <CardHeader title="User Details" />
                          <CardContent sx={{ pb: 5 }}>
                            <CardMedia
                              sx={{ pb: 1 }}
                              component="img"
                              height="140"
                              image={user.url}
                              alt="user_picture"
                            />
                            <Typography
                              sx={{ pb: 1 }}
                              variant="body2"
                              color="text.secondary"
                            >
                              Country: {user.country}
                            </Typography>
                            <Typography
                              sx={{ pb: 1 }}
                              variant="body2"
                              color="text.secondary"
                            >
                              Points: {user.points}
                            </Typography>
                            <Typography
                              sx={{ pb: 1 }}
                              variant="body2"
                              color="text.secondary"
                            >
                              isGold: {user.isGold.toString()}
                            </Typography>
                            <Typography
                              sx={{ pb: 1 }}
                              variant="body2"
                              color="text.secondary"
                            >
                              Date: {formattedUserDate}
                            </Typography>
                            <Typography
                              sx={{ pb: 1 }}
                              variant="body2"
                              color="text.secondary"
                            >
                              League: {user.ranking.league}
                            </Typography>
                            <Typography
                              sx={{ pb: 1 }}
                              variant="body2"
                              color="text.secondary"
                            >
                              Level: {user.ranking.level}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Name: {user.name}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button onClick={handleClose} size="large">
                              Close
                            </Button>
                          </CardActions>
                        </Card>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
