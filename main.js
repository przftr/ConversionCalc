//Event Listener and Main Function
document.getElementById('calculate').onclick=function convertValue(){
    //Defining Variables
    const startVal=Number(document.getElementById('startVal').value),startScale=document.getElementById('startScale').value,endScale=document.getElementById('endScale').value,convMethod=startScale.concat('>',endScale),
    HRC=[20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68],
    HR15N=[69.4,69.9,70.5,71.0,71.6,72.2,72.8,73.3,73.9,74.5,75,75.6,76.1,76.6,77.2,77.7,78.3,78.8,79.4,79.9,80.4,80.9,81.5,82,82.5,83,83.5,83.9,84.5,85,85.5,85.9,86.4,86.9,87.4,87.9,88.3,88.9,89.3,89.8,90.2,90.7,91.1,91.4,91.8,92.2,92.5,92.9,93.2],
    HV5=[238,243,248,254,260,266,727,279,286,294,302,310,318,327,336,345,354,363,372,382,392,402,412,423,434,446,458,471,484,498,513,528,544,560,577,595,613,633,653,674,697,720,746,772,800,832,865,900,940],
    HK5=[251,256,261,266,272,278,284,290,297,304,311,318,326,334,342,351,360,370,380,391,402,414,426,438,452,466,480,495,510,526,542,558,576,594,612,630,650,670,690,710,732,754,776,799,822,846,870,895,920],
    UTS=[110,112,115,117,119,123,125,128,131,135,138,141,146,149,152,156,161,166,171,177,182,188,195,201,208,215,221,229,237,246,255,264,273,283,292,301,313,325,338,351]
    let result,error=false
    //Obtain Closest Index
    const closeHR15N=HR15N.reduce((prev,curr)=>Math.abs(curr-startVal)<Math.abs(prev-startVal)?curr:prev),
    closeHV5=HV5.reduce((prev,curr)=>Math.abs(curr-startVal)<Math.abs(prev-startVal)?curr:prev),
    closeHK5=HK5.reduce((prev,curr)=>Math.abs(curr-startVal)<Math.abs(prev-startVal)?curr:prev)
    //Error Messaging
    if(!startVal||!startScale||!endScale||startScale===endScale){
        alert('Error! Please fill out the entire form. The scales can not be identical.')
    }else if(startVal!=""&&startScale!=""&&endScale!=""){
        //Conversion Logic
        switch(convMethod){
            case'HRC>HR15N':result=(200*(125*startVal+14576))/48923;break;
            case'HRC>HV.5':result=HV5[HRC.indexOf(startVal)];break;
            case'HRC>HK.5':result=HK5[HRC.indexOf(startVal)];break;
            case'HRC>UTS':if (!UTS[HRC.indexOf(startVal)]){alert('Error! Out of scale!');error=true}else {result=UTS[HRC.indexOf(startVal)]};break;
            case'HR15N>HRC':result=-116.608+1.95692*startVal;break;
            case'HR15N>HV.5':result=HV5[HR15N.indexOf(closeHR15N)];break;
            case'HR15N>HK.5':result=HK5[HR15N.indexOf(closeHR15N)];break;
            case'HR15N>UTS':if (!UTS[HR15N.indexOf(closeHR15N)]){alert('Error! Out of scale!');error=true}else {result=UTS[HR15N.indexOf(closeHR15N)]};break;
            case'HV.5>HRC':result=31.49+(.0796683*startVal)-(.0000355432*startVal**2)-(6728.16*startVal**-1);break;
            case'HV.5>HR15N':result=117.94-((553000/startVal)**.5);break;
            case'HV.5>HK.5':result=HK5[HV5.indexOf(closeHV5)];break;
            case'HV.5>UTS':if (!UTS[HV5.indexOf(closeHV5)]){alert('Error! Out of scale!');error=true}else {result=UTS[HV5.indexOf(closeHV5)]};break;
            case'HK.5>HRC':result=(64.3102+(.00759497*startVal)+(.0000113729*startVal**2)-(11451.5*startVal**-1));break;
            case'HK.5>HR15N':result=HR15N[HK5.indexOf(closeHK5)];break;
            case'HK.5>HV.5':result=HV5[HK5.indexOf(closeHK5)];break;
            case'HK.5>UTS':if (!UTS[HK5.indexOf(closeHK5)]){alert('Error! Out of scale!');error=true}else {result=UTS[HK5.indexOf(closeHK5)]};break;
            default: alert('Error in conversion logic!');error=true
        }
        //Display Result
        if(error===true){
            document.location.reload()
        }else if(convMethod.includes('UTS')){
            document.getElementById('result').innerHTML=`${Math.round(result)}${endScale}`
            document.getElementById('before').style.display='none'
            document.getElementById('after').style.display='block'
        }else if(convMethod.includes('>HR15N')){
            document.getElementById('result').innerHTML=`${result.toFixed(1)}${endScale}(${startVal}${startScale})`
            document.getElementById('before').style.display='none'
            document.getElementById('after').style.display='block'            
        }else{
            document.getElementById('result').innerHTML=`${Math.round(result)}${endScale}(${startVal}${startScale})`
            document.getElementById('before').style.display='none'
            document.getElementById('after').style.display='block'
        }
    }
}
//Reset Page
document.getElementById('reset').onclick=function reload(){
    document.location.reload()
}