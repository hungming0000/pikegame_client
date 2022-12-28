export function checkArray(key){
    let arr=[];

    var type = sessionStorage.getItem("accountstyle");

    switch (type) {
        case '0': //比賽制定者
        arr=['CreateTournament','CreateSession','EditSession','CreateEquipment','EditEquipment','Sessiondetail','CreateAccountm','EditAccountm','DeleteAccountm','clickrb','EditScore','CreateAd','EditAd','DeleteAd','CreateVideo','EditVideo','DeleteVideo'];
        break;
        case '1': //裁判
        arr=['Sessiondetail','clickrb','EditScore'];
        break;
        case '2': //選手
        arr=['Sessiondetail','childclickrb'];
        break;
        case '3': //觀眾
        arr=['Sessiondetail','childclickrb'];
        break;
    }
    let index =arr.indexOf(key);
    if(index>-1){
        return true;
    }
    else{
        return false;
    }


}