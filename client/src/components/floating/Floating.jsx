
// FloatingButton.js
import { Fab } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const FloatingButton = () => {
  return (
    <div
      className="fixed bottom-24 right-2 flex flex-col gap-4 "
      style={{ zIndex: 9999 }}
    >
      {/* WhatsApp icon */}
      <a
        href="https://api.whatsapp.com/send?phone=7010534355
        "
        target="_blank"
        rel="noopener noreferrer"
      >
        <Fab
          color="primary"
          size="medium"
          aria-label="whatsapp"
          sx={{
            backgroundColor: "#25d366",
            marginRight: 2,
          }}
        >
          <WhatsAppIcon />
        </Fab>
      </a>

      {/* Phone icon */}
      <a href="tel:+91 70105 34355">
        <Fab
          color="primary"
          size="medium"
          aria-label="phone"
          sx={{
            backgroundColor: "#34b7f1", // Phone blue color
          }}
        >
          <CallIcon />
        </Fab>
      </a>
      
    </div>
  );
};

export default FloatingButton;
