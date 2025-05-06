import { useState } from "react";
import {
  Alert,
  AlertTitle,
  Button,
  Box,
  Typography,
  Collapse,
} from "@mui/material";

const ErrorComponent = ({ error, severity = "error", sx = {} }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Box sx={{ width: "100%", ...sx }}>
      <Alert severity={severity} sx={{ mb: 2 }}>
        <AlertTitle>{error?.title || "Something went wrong"}</AlertTitle>
        {error?.message || "An unexpected error occurred"}

        {error?.details && (
          <>
            <Button
              size="small"
              sx={{ ml: 1 }}
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? "Hide details" : "Show details"}
            </Button>
            <Collapse in={showDetails}>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {error.details}
              </Typography>
            </Collapse>
          </>
        )}
      </Alert>
    </Box>
  );
};

export default ErrorComponent;
