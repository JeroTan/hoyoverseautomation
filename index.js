import { MainRouting } from "./routing/main.js";
import { GenshinImpact, HonkaiImpact, HonkaiStarRail, LanguageEnum } from 'hoyoapi'

const routing = new MainRouting;
routing.run();


//AUTOMATION BELOW
const userAccount = {
    ltoken:"mNkCSoQQ8Zct2WRgcWFq6bnmLG7piAFi481IzwH3", 
    "_MHYUUID":"d6be1ea2-37df-4cb6-9983-ab42e8bfc8df",
    mi18nLang:"en-us",
    DEVICEFP_SEED_ID: "f30147575434b712",
    DEVICEFP_SEED_TIME:1682157444812, 
    G_ENABLED_IDPS:"google",  
    ltuid:"28376676",
    account_mid_v2:"1bk01xfxzz_hy", 
    account_id_v2:28376676,
    ltmid_v2:"1bk01xfxzz_hy", 
    ltuid_v2:28376676,
    HYV_LOGIN_PLATFORM_LIFECYCLE_ID:"{%22value%22:%227f38c8a3-8475-4a12-8346-813f7b479615%22}", 
    HYV_LOGIN_PLATFORM_OPTIONAL_AGREEMENT:"{%22content%22:[]}",
    HYV_LOGIN_PLATFORM_LOAD_TIMEOUT:{},
    HYV_LOGIN_PLATFORM_TRACKING_MAP:{}, 
    DEVICEFP:"38d7f290c110b"

}
const genshin = new GenshinImpact({
    cookie: userAccount, // Required. Cookie can be string or object, see the api refeence below
    lang: LanguageEnum.ENGLISH, // optional
    uid: 805224203, // Several modules will require UID, which if not filled in will throw an error.
});
const honkai3rd = new HonkaiImpact({
    cookie: userAccount, // Required. Cookie can be string or object, see the api refeence below
    lang: LanguageEnum.ENGLISH, // optional
    //uid: 837_678_687, // Several modules will require UID, which if not filled in will throw an error.
})
const hsr = new HonkaiStarRail({
    cookie: userAccount, // Required. Cookie can be string or object, see the api refeence below
    lang: LanguageEnum.ENGLISH, // optional
    uid: 802617609, // Several modules will require UID, which if not filled in will throw an error.
  })
const timeNow = new Date
let hourTimer = ((timeNow.getHours() - 5)+24)%24
let minuteTimer = timeNow.getMinutes();
let secondTimer = timeNow.getSeconds();
async function allAutomate(){
    const giclaim = await genshin.daily.claim();
    const honkai3rdclaim = await honkai3rd.daily.claim();
    const hsrclaim = await hsr.daily.claim();
    console.log(giclaim, honkai3rdclaim, hsrclaim);

    const gireward = await genshin.daily.reward();
    const honkai3rdreward = await honkai3rd.daily.reward();
    const hsrreward = await hsr.daily.reward();
    console.log(gireward, honkai3rdreward, hsrreward);
}


setInterval(()=>{
    secondTimer = (secondTimer+1)%60
    if(secondTimer == 0){
        minuteTimer = (minuteTimer+1)%60
    }
    if(minuteTimer == 0){
        hourTimer = (hourTimer+1)%24
    }
    console.log(`time check: ${hourTimer}h ${minuteTimer}m ${secondTimer}s`)
    if(hourTimer == 0){
        console.log('Checking in!!!')
        allAutomate();
    }
}, 1000)