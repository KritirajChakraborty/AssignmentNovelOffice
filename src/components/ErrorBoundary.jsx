import { Box, Typography, Button, Paper } from "@mui/material";
import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <Paper
          sx={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            p: 3,
            bgcolor: "#fff0f0",
          }}
        >
          <Box>
            <Typography variant="h4" gutterBottom color="error">
              Something went wrong.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              {this.state.error?.message || "An unknown error occurred."}
            </Typography>
            {this.state.errorInfo && (
              <Box
                sx={{
                  textAlign: "left",
                  maxHeight: 200,
                  overflowY: "auto",
                  bgcolor: "#f8d7da",
                  p: 2,
                  mb: 2,
                  borderRadius: 1,
                  fontFamily: "monospace",
                  fontSize: 12,
                }}
              >
                {this.state.errorInfo.componentStack}
              </Box>
            )}
            <Button
              variant="contained"
              color="error"
              onClick={this.handleReset}
            >
              Back to Home Page
            </Button>
          </Box>
        </Paper>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
