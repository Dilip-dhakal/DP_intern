import app from "./app.js";
import envConfig from "./config/envConfig.js";


const PORT=envConfig.PORT || 3000

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`)
})