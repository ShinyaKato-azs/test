/*******　questions.jsで定義した質問を読み込み ********/
const questions = window.questions;


/*******　質問の生成 ********/
//質問連想配列の作成
let questionsArrayList = {};
//キー
let questionsArrayListKey;
//質問の数だけ繰り返す
for(i=0;i<questions.length;i++){
  questionsArrayListKey = 1+i;
  questionsArrayListValue = questions[i];
  questionsArrayList[questionsArrayListKey]=questionsArrayListValue;
}



/*******　グローバル変数の管理 ********/
//会社名
let companyName=sessionStorage.getItem("companyName");
//従業員規模
let numberOfEmployees=sessionStorage.getItem("numberOfEmployees");
//ユーザー名
let userName = sessionStorage.getItem("userName");
console.log(companyName);
console.log(numberOfEmployees);
console.log(userName);
//会社・ユーザー情報を保存する連想配列
let companyInfo={"会社名":companyName,"従業員数":numberOfEmployees,"名前":userName};

//現在の質問番号
let currentQuestionNumber = 1;
//一つ前の質問番号
let previousQuestionNumber = 0;
//現在の質問（質問番号１で初期化）
let currentQuestion = questionsArrayList[1];
//選択肢１の表示名
let currentQuestionOption1Name = currentQuestion.option1.name;
//選択肢２の表示名
let currentQuestionOption2Name = currentQuestion.option2.name;

//回答を保存する連想配列：キーが質問番号で値が選択肢番号
let answers = {};
//回答した質問番号の履歴を保存する配列
let questionNumberHistory = [];
//回答した選択肢番号の履歴を保存する配列
let optionNumberHistory = [];

//質問文を初期化
updateQuestion();

/******* 画面に表示する質問オブジェクト・選択肢オブジェクトの要素（質問文・選択肢）の更新機能：フロント寄り *******/
function updateQuestion(){
  
  //質問文の更新
  document.getElementById("question").innerText = currentQuestion.sentence;
  //選択肢１の更新
  document.getElementById("option1").textContent = currentQuestion.option1.name;
  //選択肢２の更新
  document.getElementById("option2").textContent = currentQuestion.option2.name;

}

/******* 全回答をローカルストレージに保存する機能(結果画面表示前に呼び出す) *******/
function saveToLocalStorage(){

  /** キーの処理 **/
  //定義したメソッドでyyyymmddhh24miss形式で現在時刻を取得
  let localStorageKey = getLocalStorageKey();

  /** 値の処理 **/
  //日付を設定(年月日まで)
  let now = new Date();
  let yymmdd = now.getFullYear()+'年'+(now.getMonth()+1)+'月'+(now.getDate())+'日';
  //日付、会社・ユーザー情報、回答一覧を格納するuserData連想配列を作成する
  let userData={"日付":yymmdd,"会社・ユーザー情報":companyInfo,"回答":answers};
  //json形式に変換
  let userDataJsonText =JSON.stringify(userData);

  //ローカルストレージに保存
  window.localStorage.setItem(localStorageKey,userDataJsonText);
  //セッションストレージを削除（ユーザー切り替え）
  sessionStorage.clear();
  
}


/******* 個別回答保存機能 *******/
function answerQuestion(optionNumber) {

  /* 選んだ選択肢を格納する変数を宣言 */
  let chosenOption;

  /* 選んだ選択肢を変数に格納 */
  if(optionNumber == 1){
    chosenOption = currentQuestion.option1;
  }else{
    chosenOption = currentQuestion.option2;
  }

  /* 回答を連想配列に追加 */
  //キー：現在の質問番号
  const answersKey = currentQuestionNumber;
  //値：選択肢番号
  const answersValue = chosenOption.number;
  //連想配列に追加
  answers[answersKey] = answersValue;
  console.log(answers);
  /* 回答した質問を質問番号履歴に保存 */
  questionNumberHistory.push(currentQuestionNumber);
  console.log(questionNumberHistory);
  /* 選んだ選択肢を選択肢番号履歴に保存 */
  optionNumberHistory.push(optionNumber);
  console.log(optionNumberHistory);

  //回答と履歴を保存したので、一つ前の質問番号を更新する
  previousQuestionNumber=questionNumberHistory[questionNumberHistory.length-1];

  //最後の選択肢かどうかをチェック
  checkLastOption(chosenOption);

}

/******* 質問遷移・結果画面遷移機能 *******/
function checkLastOption(chosenOption){

  /* 最後の質問なら、保存して結果画面に遷移 */
  if(chosenOption.isThisLastOption==true){

    //ローカルストレージに保存
    saveToLocalStorage();
    //結果画面へ遷移
    window.location.href = chosenOption.href;

  }
  /* 質問が続くなら、次の質問を指定する */
  else{

  /* currentQuestionNumberを次の質問番号に更新 */
  currentQuestionNumber = chosenOption.nextQuestionNumber;

  /* 更新したcurrentQuestionuNumber(次の質問番号）から次の質問を取得して、現在の質問を更新 */
  currentQuestion = questionsArrayList[currentQuestionNumber];

  /* 画面（質問文・選択肢）の更新:フェードアウトに合わせて遅延実行 */
  window.setTimeout(updateQuestion,300);

  }

}


/******* 一つ戻る機能 *******/
function backToPreviousQuestion(){

  if(previousQuestionNumber==0){
      //例外処理：最初の質問の場合は何もしない
  }
  else{
    //最後の回答(連想配列)を削除
    delete answers[previousQuestionNumber];
    console.log(answers);
    //質問番号履歴の最後の要素を削除
    questionNumberHistory.pop();
    console.log(questionNumberHistory);
    //選択肢番号履歴の最後の要素を削除
    optionNumberHistory.pop();
    console.log(optionNumberHistory);

    //質問番号を一つ前に戻す
    currentQuestionNumber=previousQuestionNumber;
    //質問を一つ前に戻す
    currentQuestion=questionsArrayList[currentQuestionNumber];

    //前回の質問番号を更新
    if(questionNumberHistory.length==0){
      //これ以上履歴がないなら何もしない
    }else{
      previousQuestionNumber=questionNumberHistory[questionNumberHistory.length-1];
    }
    //画面（質問文・選択肢）を一つ前に戻す
    window.setTimeout(updateQuestion,300);

  }

}

/******* 最初からやり直す機能 *******/
function restart(){

  //回答保存用の連想配列の全要素を削除
  for (const answerskey in answers) {
    if (answers.hasOwnProperty(answerskey)) {
        delete answers[answerskey];
    }
  }
  //質問番号履歴を削除
  questionNumberHistory=[];
  //選択肢番号履歴を削除
  optionNumberHistory=[];

  //現在の質問番号・一つ前の質問番号・現在の質問の初期化
  currentQuestionNumber = 1;
  previousQuestionNumber = 0;
  currentQuestion=questionsArrayList[currentQuestionNumber];

  //画面の更新
  pageTransition();
  window.setTimeout(updateQuestion,300);
  console.log('はじめからやり直しました')
  console.log(answers);
  console.log(questionNumberHistory);
  console.log(optionNumberHistory);

}

//やり直しボタンが押されたときに確認ダイアログを表示
let restartButton = document.getElementById('restart-button');
restartButton.addEventListener('click',function(){

  let result = window.confirm("本当に最初からやりなおしますか？");
  if(result==true){
    restart();
  }
  if(result==false){
    console.log('キャンセル');
  }

})


/******* アニメーション機能 *******/
//ページ遷移
function pageTransition(){
  fadeOut();
  fadeIn();
}
//フェードアウト
function fadeOut(){
  const keyframes ={
    opacity:["1","0"]
  }
  const timing ={
    fill:"forwards" ,
    duration:300
  }
// アニメーションを加える要素を指定
document.getElementById('container').animate(keyframes,timing);
}
//フェードイン
function fadeIn(){
  const keyframes ={
    opacity:["0","1"]
  }
  const timing ={
    fill:"forwards" ,
    delay:300 ,
    duration:300
  }
  // アニメーションを加える要素を指定
  document.getElementById('container').animate(keyframes,timing);
}

/******* yyyymmddhh24miss形式の現在時刻（ローカルストレージのキー）を取得するモジュール *******/
function getLocalStorageKey(){

//現在時間を取得
let now = new Date();

/* 年月日時分秒で取得（yyyymmddhh24miss形式）*/
//年
let year = now.getFullYear().toString();

//月（一桁なら最初に0を付けて二桁にする/＊getMonth()は今の月-1の値が返ってくるため、+1している）
let month; 
 month=adjustDateNumber(now.getMonth()+1);

//日（一桁なら最初に0を付けて二桁にする）
let date;
 date = adjustDateNumber(now.getDate());

//時（一桁なら最初に0を付けて二桁にする）
let hours;
 hours = adjustDateNumber(now.getHours());

//分（一桁なら最初に0を付けて二桁にする）
let minutes;
 minutes = adjustDateNumber(now.getMinutes());

//秒（一桁なら最初に0を付けて二桁にする）
let seconds;
  seconds = adjustDateNumber(now.getSeconds());

let key = year+month+date+hours+minutes+seconds;
return key;

}

/******* 数字が一桁の場合に冒頭に0を足すモジュール *******/
function adjustDateNumber(n){
  let adjustNumber;
  if(n > 9){
    adjustNumber = n.toString();
  }else{
    adjustNumber = 0+n.toString();
  }
  return adjustNumber;
}

/******* 16進数のシリアルナンバー作成するモジュール(web掲載時に使用するかも) *******/
function getUniqueStr(){
  var strong = 1000;
  return new Date().getTime().toString(16)  + Math.floor(strong*Math.random()).toString(16)
}
  
