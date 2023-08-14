//質問クラス
class Question{

  //質問番号（ユニーク）
  number;
  //質問文
  sentence;
  //選択肢１のオブジェクト(選択肢クラス)
  option1;
  //選択肢2のオブジェクト（選択肢クラス）
  option2;

  //コンストラクタ
  constructor(number,sentence,option1,option2){
    this.number=number;
    this.sentence=sentence;
    this.option1=option1;
    this.option2=option2;
  }
}

//選択肢クラス
class Option{

  //選択肢番号（１番か２番か）
  number;
  //選択肢の表示名（「はい」「遊びます」など）
  name;
  //次の質問の質問番号
  nextQuestionNumber;
  //最後の選択肢かどうか(true/false)
  isThisLastOption;
  //結果画面のリンク（最後の質問のときだけ使用）
  href;

  //コンストラクタ
  constructor(number,name,nextQuestionNumber,isThisLastOption,href){
    this.number=number;
    this.name=name;
    this.nextQuestionNumber=nextQuestionNumber;
    this.isThisLastOption=isThisLastOption;
    this.href=href;
  }

}
/*******　質問の生成 ********/
/*【デモ質問１】*/
//選択肢インスタンス化
const number1Option1= new Option(1,'若年層',2,false,'');
const number1Option2= new Option(2,'中年層',3,false,'');
//質問をインスタンス化
const demoQuestion1 = new Question(1,'1：社員の年齢層はどちらが多いですか？',number1Option1,number1Option2);

/*【デモ質問2】*/
//選択肢インスタンス化
const number2Option1= new Option(1,'はい',4,false,'');
const number2Option2= new Option(2,'いいえ',5,false,'');
//質問をインスタンス化
const demoQuestion2 = new Question(2,'2：ゲームでよく遊ぶ社員は多いですか？',number2Option1,number2Option2);

/*【デモ質問3】*/
//選択肢インスタンス化
const number3Option1= new Option(1,'はい',4,false,'');
const number3Option2= new Option(2,'いいえ',6,false,'');
//質問をインスタンス化
const demoQuestion3 = new Question(3,'3：ゲームでよく遊ぶ社員は多いですか？',number3Option1,number3Option2);

/* 【デモ質問4】:最終質問 */
//選択肢インスタンス化
const number4Option1= new Option(1,'個人戦',1,true,'demoResult.html');
const number4Option2= new Option(2,'チーム戦',1,true,'demoResult2.html');
//質問をインスタンス化
const demoQuestion4 = new Question(4,'4:個人戦とチーム戦はどちらが魅力的ですか？',number4Option1,number4Option2);

/* 【デモ質問5】:最終質問 */
//選択肢インスタンス化
const number5Option1= new Option(1,'スポーツ',1,true,'demoResult2.html');
const number5Option2= new Option(2,'娯楽',1,true,'demoResult3.html');
//質問をインスタンス化
const demoQuestion5 = new Question(5,'5:スポーツ要素と娯楽要素はどっち重視？',number5Option1,number5Option2);


/*【デモ質問6】:最終質問 */
//選択肢インスタンス化
const number6Option1= new Option(1,'はい',1,true,'demoResult.html');
const number6Option2= new Option(2,'いいえ',1,true,'demoResult3.html');
//質問をインスタンス化
const demoQuestion6 = new Question(6,'6:昔はゲームでよく遊んでいた社員が多いですか？',number6Option1,number6Option2);

/* 質問配列の作成 */
const questionsArrayList ={1:demoQuestion1,2:demoQuestion2,3:demoQuestion3,4:demoQuestion4,5:demoQuestion5,6:demoQuestion6}


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
let currentQuestion=demoQuestion1;
//選択肢１の表示名
let currentQuestionOption1Name=currentQuestion.option1.name;
//選択肢２の表示名
let currentQuestionOption2Name=currentQuestion.option2.name;
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
  document.getElementById("question").textContent = currentQuestion.sentence;
  //選択肢１の更新
  document.getElementById("option1").textContent = currentQuestion.option1.name;
  //選択肢２の更新
  document.getElementById("option2").textContent = currentQuestion.option2.name;

}

/******* 全回答をローカルストレージに保存する機能(結果画面表示前に呼び出す) *******/
function saveToLocalStorage(){

  //会社・ユーザー情報と回答一覧を格納するuserData連想配列を作成する
  let userData={"会社・ユーザー情報":companyInfo,"回答":answers};
  //json形式に変換
  let userDataJsonText =JSON.stringify(userData);
  //ローカルストレージのキーに現在時間のミリ秒を設定
  let now = new Date();
  let locasStorageKey =now.getTime();
  //ローカルストレージに保存
  window.localStorage.setItem(locasStorageKey,userDataJsonText);
  //セッションストレージを削除（ユーザー切り替え）
  sessionStorage.clear();
  
}


/******* 個別回答保存・質問遷移機能 *******/
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
  currentQuestion=demoQuestion1;

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

/******* 16進数のシリアルナンバー作成機能 *******/
function getUniqueStr(){
  var strong = 1000;
  return new Date().getTime().toString(16)  + Math.floor(strong*Math.random()).toString(16)
 }

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
