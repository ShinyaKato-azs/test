/*******　json形式で全ての質問を定義し、グローバル変数に格納 ********/
window.questions = {
    "Question1":
      {
        "number":"1", 
        "sentence": "1:社員の年齢層はどちらが多いですか？",
        "option1":{"number":1,"name":"若年層","nextQuestionNumber":2,"isThisLastOption":false,"href":""},
        "option2":{"number":2,"name":"中年層","nextQuestionNumber":3,"isThisLastOption":false,"href":""}
  
      },
    "Question2":
      {
        "number":"2", 
        "sentence": "2:ゲームで遊ぶ社員は多いですか？",
        "option1":{"number":1,"name":"はい","nextQuestionNumber":4,"isThisLastOption":false,"href":""},
        "option2":{"number":2,"name":"いいえ","nextQuestionNumber":5,"isThisLastOption":false,"href":""}
  
      },
    "Question3":
      {
        "number":"3", 
        "sentence": "3:ゲームでよく遊ぶ社員は多いですか？",
        "option1":{"number":1,"name":"はい","nextQuestionNumber":4,"isThisLastOption":false,"href":""},
        "option2":{"number":2,"name":"いいえ","nextQuestionNumber":6,"isThisLastOption":false,"href":""}
  
      },
    "Question4":
      {
        "number":"4", 
        "sentence": "4:個人戦とチーム戦ではどちらの方が魅力的ですか？",
        "option1":{"number":1,"name":"個人戦","nextQuestionNumber":1,"isThisLastOption":true,"href":"demoResult.html"},
        "option2":{"number":2,"name":"チーム戦","nextQuestionNumber":1,"isThisLastOption":true,"href":"demoResult2.html"}
  
      },
     "Question5":
      {
        "number":"5", 
        "sentence": "5:スポーツ要素と娯楽要素のどちらを重視しますか？",
        "option1":{"number":1,"name":"スポーツ","nextQuestionNumber":1,"isThisLastOption":true,"href":"demoResult2.html"},
        "option2":{"number":2,"name":"娯楽","nextQuestionNumber":1,"isThisLastOption":true,"href":"demoResult3.html"}
  
      },
    "Question6":
      {
        "number":"6", 
        "sentence": "6:昔はゲームでよく遊んでいた社員が多いですか？",
        "option1":{"number":1,"name":"はい","nextQuestionNumber":1,"isThisLastOption":true,"href":"demoResult.html"},
        "option2":{"number":2,"name":"いいえ","nextQuestionNumber":1,"isThisLastOption":true,"href":"demoResult3.html"}
  
      }
  };