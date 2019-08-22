import { getOpenId } from ".";

export function getSetting(auth,onSuccess,onFail){
  mpvue.getSetting({
    success(res){
      console.log(res)
      if(res.authSetting[`scope.${auth}`]){
        onSuccess(res)
      }else{
        onFail(res)
      }
    },
    fail(err){
      console.log(err)
    }
  })
}

export function getUserInfo(onSuccess,onFail){
  mpvue.getUserInfo({
    success(res){
      const {userInfo} = res
      if(userInfo){
        onSuccess(userInfo)
      }else{
        onFail(res)
      }
    },
    fail(err){
      console.log(err)
    }
  })
}

export function setStorageSync(key,data){
  mpvue.setStorageSync(key,data)
}

export function getStorageSync(key){
  mpvue.getStorageSync(key)
}

export function getUserOpenId(callback){
  mpvue.login({
    success(res){
      if(res.code){
        const {code} = res
        getOpenId(code).then(res=>{
          const { data:{data:{openid}}} = res
          setStorageSync('openId',openid)
          callback && callback(openid)
        }).catch(err=>{
          console.log('err')
        })
      }else{

      }
    },
    fail(){err}
  })
}

export function showLoading(title){
  mpvue.showLoading({
    title,
    mask:true
  })
}

export function hideLoading(){
  mpvue.hideLoading()
}

export function showToast(title){
  mpvue.showToast({
    title,
    duration:2000
  })
}

