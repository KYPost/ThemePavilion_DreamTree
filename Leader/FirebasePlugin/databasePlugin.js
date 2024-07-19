//#region - Post -
// 上傳資料
// 會覆蓋掉相同路徑的資料
// path: 資料庫路徑
// value: 資料的JSON字串
function PostData(path, value) {

    firebase.database().ref(path)
        .set(value)
        .then(() => {
            console.log("Success: " + path + " was posted.");
        }).catch((error) => {
            console.log("There was an error: " + error.message);
        });
}
//#endregion

//#region - Get -
// 獲取資料
// path: 資料庫路徑
// object: 回傳呼叫的物件名
// callback: 回傳呼叫的方法名
function GetData(path, object, callback) {
    firebase.database().ref(path)
        .once('value')
        .then((snapshot) => {
            if (snapshot.exists()) {
                var result = snapshot.val();
                console.log(result);
                window.unityInstance.SendMessage(object, callback, JSON.stringify(result));
            } else {
                console.log("No data available");
                window.unityInstance.SendMessage(object, callback, "");
            }
        }).catch((error) => {
            console.log("There was an error: " + error.message);
        });
}
//#endregion

//#region - Push -
// 上傳資料
// 不會覆蓋相同路徑的資料
// path: 資料庫路徑
// value: 資料的JSON字串
function PushData(path, value) {
    // Write the new post's data in the user's post list.

    firebase.database().ref(path)
        .push()
        .set(value)
        .then(() => {
            console.log("Success: " + path + " was pushed.");
        }).catch((error) => {
            console.log("There was an error: " + error.message);
        });
}
//#endregion

//#region - Update -
// 更新資料
// path: 資料庫路徑
// value: 資料的JSON字串
function UpdateData(path, value) {
    firebase.database().ref(path)
        .update(value)
        .then(() => {
            console.log("Success: " + path + " was updated.");
        }).catch((error) => {
            console.log("There was an error: " + error.message);
        });
}
//#endregion

//#region - Delete -
// 刪除資料
// path: 資料庫路徑
function DeleteData(path) {
    firebase.database().ref(path)
        .remove()
        .then(() => {
            console.log("Success: " + path + " was removed.");
        }).catch((error) => {
            console.log("There was an error: " + error.message);
        });
}
//#endregion

//#region - Value Change Listener -
// 監聽資料有無改變
// 初始設定時，會回傳一次
// 當有改變時，回傳整份資料
// path: 資料庫路徑
// object: 回傳呼叫的物件名
// callback: 回傳呼叫的方法名
function ListenForValueChanged(path, object, callback) {
    try {
        firebase.database().ref(path).on("value", (snapshot) => {
            window.unityInstance.SendMessage(object, callback, JSON.stringify(snapshot.val()));
        });
    } catch (error) {
        console.log("There was an error: " + error.message);
        window.unityInstance.SendMessage(object, callback, "");
    }
}
//#endregion

//#region - Child Added Listener -
// 監聽資料的子物件有無添加
// 初始設定時，會分次回傳所有子物件
// 當有子物件添加時，回傳添加的子物件
// path: 資料庫路徑
// object: 回傳呼叫的物件名
// callback: 回傳呼叫的方法名
function ListenForChildAdded(path, object, callback) {
    try {
        firebase.database().ref(path).on("child_added", (snapshot) => {
            window.unityInstance.SendMessage(object, callback, JSON.stringify(snapshot.val()));
        });
    } catch (error) {
        console.log("There was an error: " + error.message);
        window.unityInstance.SendMessage(object, callback, "");
    }
}
//#endregion

//#region - Child Change Listener -
// 監聽資料的子物件有無改變
// 初始設定時，會分次回傳所有子物件
// 當有子物件改變時，回傳改變的子物件
// path: 資料庫路徑
// object: 回傳呼叫的物件名
// callback: 回傳呼叫的方法名
function ListenForChildChanged(path, object, callback) {
    try {
        firebase.database().ref(path).on("child_changed", (snapshot) => {
            window.unityInstance.SendMessage(object, callback, JSON.stringify(snapshot.val()));
        });
    } catch (error) {
        console.log("There was an error: " + error.message);
        window.unityInstance.SendMessage(object, callback, "");
    }
}
//#endregion

//#region - Child Removed Listener -
// 監聽資料的子物件有無移除
// 初始設定時，會分次回傳所有子物件
// 當有子物件移除時，回傳移除的子物件
// path: 資料庫路徑
// object: 回傳呼叫的物件名
// callback: 回傳呼叫的方法名
function ListenForChildRemoved(path, object, callback) {
    try {
        firebase.database().ref(path).on("child_removed", (snapshot) => {
            window.unityInstance.SendMessage(object, callback, JSON.stringify(snapshot.val()));
        });
    } catch (error) {
        console.log("There was an error: " + error.message);
        window.unityInstance.SendMessage(object, callback, "");
    }
}
//#endregion

//#region - Close Listener -
// 停止監聽資料
// path: 資料庫路徑
function CloseListener(path) {
    firebase.database().ref(path).off();
    console.log("Success: " + path + "'s listener was closed.");
}
//#endregion
