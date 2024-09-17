/**
 * fetchのラッパー関数
 * 特徴
 *  ・非同期
 *  ・引数：ULR, HTTPRequestMethod param
 *  ・headersは固定
 *  ・レスポンスはjson形式のみ
 *  ・処理分岐
 *   ・HTTPステータスOK：bodyを返却
 *   ・HTTPステータスNG：例外をスロー（呼び出し元catch句でエラーハンドリング）
 */
// ヘッダー
const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
};

export function fetchWrapper(url, reqMethod, param) {
    var jsonString = JSON.stringify(param);
    console.log(jsonString)
    return fetch(url, {method: reqMethod, headers: headers, body: jsonString})
    .catch(err => {
        // ネットワークエラー
        console.error("fetch request error:" + err);
        throw new Error("API通信で予期せぬエラーが発生しました。");
    })
    .then(response => {
        // ステータス異常
        if (!response.status === 200) {
            console.error("http response error:" + response.status);
            throw new Error("HTTP通信に失敗しました。");
        }
        const responseJsonPromise = response.json();
        return responseJsonPromise.then(body => ({body: body}));
    })
    .then(({body}) => {
        return body;
    })
}