const app = require("./app");
const mogodbConnection = require("./config/db");
const cloudinaryConfig = require("./config/cloudinary");

cloudinaryConfig();

mogodbConnection();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`API CONNECTED SUCCESSFULLY ON PORT ${PORT}`);
});
