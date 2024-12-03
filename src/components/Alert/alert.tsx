import { MuiIcon } from "../../utils/muiIcon";
import * as React from "react";
import Box from "@mui/joy/Box";
import Alert from "@mui/joy/Alert";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import { ColorPaletteProp } from "@mui/joy/styles";

interface AlertProps {
  name: string;
  message: string;
}

export default function AlertVariousStates({ name, message }: AlertProps) {
  const items: {
    title: string;
    color: ColorPaletteProp;
    icon: React.ReactElement;
    message: string;
  }[] = [
    {
      title: "Success",
      color: "success",
      message: message,
      icon: <MuiIcon name="CheckCircle" />,
    },
    {
      title: "Warning",
      color: "warning",
      message: message,
      icon: <MuiIcon name="Warning" />,
    },
    {
      title: "Error",
      color: "danger",
      message: message,
      icon: <MuiIcon name="Report" />,
    },
    {
      title: "Neutral",
      color: "neutral",
      message: message,
      icon: <MuiIcon name="Info" />,
    },
  ];

  const [close, setClose] = React.useState(false);

  const selectedItems = items.find((item) => item.title === name);

  return (
    <>
      {!close && (
        <Box
          sx={{
            display: "flex",
            gap: 2,
            width: "100%",
            flexDirection: "column",
            mb: 3,
          }}
        >
          {selectedItems && (
            <Alert
              key={selectedItems.title}
              sx={{ alignItems: "flex-start" }}
              startDecorator={selectedItems.icon}
              variant="soft"
              color={selectedItems.color}
              endDecorator={
                <IconButton
                  variant="soft"
                  onClick={() => setClose(true)}
                  color={selectedItems.color}
                >
                  <MuiIcon name="CloseRounded" />
                </IconButton>
              }
            >
              <div>
                <div>{selectedItems.title}</div>
                <Typography level="body-sm" color={selectedItems.color}>
                  {selectedItems.message}
                </Typography>
              </div>
            </Alert>
          )}
        </Box>
      )}
    </>
  );
}
