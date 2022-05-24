const sendPhonePath = 'https://phonenumchecker.vercel.app/send?phonenumber=48518808139',

      sendCodePath  = 'https://phonenumchecker.vercel.app/check?phonenumber=48518808139&code=716234000';

async function sendPhone(){
  console.log('sendPhone');
  let response = await fetch(sendPhonePath, {mode:'no-cors'});
  console.log(response);
}

async function sendCode(){
  console.log('sendCode');
  let response = await fetch(sendCodePath);
  console.log(response);
}


