import express from "express";
import cors from "cors";
const app=express(), PORT=process.env.PORT||3000;
app.use(cors({origin:process.env.FRONTEND_ORIGIN||"https://anmolanandxvideodownloader.edgeone.dev"}));
app.use(express.json({limit:"10kb"}));
app.get("/api/health",(_req,res)=>res.json({ok:true,service:"ANMOLANANDX backend",status:"running"}));
app.get("/",(_req,res)=>res.json({ok:true,service:"ANMOLANANDX backend",status:"running"}));
function platformOf(raw){
 let u; try{u=new URL(raw)}catch{return null}
 if(!["http:","https:"].includes(u.protocol))return null;
 const h=u.hostname.toLowerCase().replace(/^www\\./,"");
 if(h==="facebook.com"||h.endsWith(".facebook.com")||h==="fb.watch")return "Facebook";
 if(h==="instagram.com"||h.endsWith(".instagram.com"))return "Instagram";
 if(h==="t.me"||h==="telegram.org"||h.endsWith(".telegram.org"))return "Telegram";
 return "unsupported";
}
app.post("/api/check-link",(req,res)=>{
 const url=req.body?.url;
 if(typeof url!=="string"||!url.trim())return res.status(400).json({ok:false,error:"Please provide a video URL."});
 const platform=platformOf(url.trim());
 if(!platform)return res.status(400).json({ok:false,error:"Enter a valid http/https URL."});
 if(platform==="unsupported")return res.status(422).json({ok:false,platform,message:"This platform is not supported yet."});
 res.json({ok:true,platform,message:`${platform} link recognized. Download integration is not configured yet.`,downloadable:false});
});app.get("/api/download", (_req, res) => {
  res.status(501).json({
    ok: false,
    message: "Download source is not configured yet."
  });
});
app.listen(PORT,"0.0.0.0",()=>console.log(`Backend listening on ${PORT}`));
