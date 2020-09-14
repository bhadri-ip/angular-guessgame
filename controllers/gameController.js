angular.module('GuessAWord').controller('gameController', function($scope, $window) {
  $scope.firstName = "";
  $scope.isGameStarted = false;
  $scope.mode = '';
  $scope.questionPicked = 0;
  $scope.questionData = undefined;
  $scope.answer = "";
  $scope.hint = "";
  $scope.moreHint = "";
  $scope.userGuess = "";
  $scope.totalTurns = 0;
  $scope.takenTurns = 0;
  $scope.moreClue = false;
  $scope.inputMode = "letter";
  $scope.gameOver = false;
  //New
  $scope.lettersMatched = [];
  $scope.answerToCheck = [];
  $scope.totalChances = 0;
  $scope.totalScore = 0;
  $scope.showHintClicked = false;
  $scope.winMessage = "";
  $scope.looseMessage = "";
  $scope.scoreMessage = "";
  $scope.corectAnswer = "";
    

   var questions = {  
        "easy" : 
        {  
            "words" : ["hockey","grapes","circle","pineapple","lawyer","sister","mother","cricket","banana","apple"],
            "hint": ["Its a game","Its a fruit ","Its a shape","Its a fuit","Its a profession and person where black boat","Its a relation(sibling)","It is the most precious relation","It is the most popular game","its a fruit","its a healthy fruit"],
            "more_hint": ["*o*k*y","*r*pe*","*i**le","p**ea*p*e","*aw*er","*is*er","*ot*e*","*ri*k*t","b*n**a","a*pl*"]
        }, 
        "medium" : 
        {  
            "words" : ["science","keyboard","dinosaur","enhance","curiosity","collision","communication","coincidence","validation","cooperation"],
            "hint": ["It is a subject","It is used to type","It is an extinct animal","also mean increase ","also mean enthusiasm","also mean crash","mode of exchanging information by talking","also mean concurrence","action of checking accuracy","action of working together"],
            "more_hint": ["*ci*nc*","k**bo*rd","d*nos*ur","en*an*e","cu*io*i*y","co*l*si*n","co*muni*ati*n","co*n*id*nce","va*ida*io*","co*pe*at*on"  ]
        },
        "hard" : 
        {  
            "words" : ["suspicious","debase","circumspect","embezzle","gratuitous","haughty","enormity","ironic","adorable" ],
            "hint": [ "also mean dubious","it mean reduce in quantity","it mean unwilling to take risks also known cautious","it mean to steal","it mean to do at free of charge","It also mean coceited","also mean a grave crime","also mean sarcastic way","also mean lovable" ],
            "more_hint": ["*usp*ci*us","d*ba*e","ci*cu*s*ect","em*e*zle","gra*uit*us","h*ug*ty","e*or*ity","ir*n*c","a*ora*le"]
        }
    }

  $scope.startGame = function() {
    // $scope.questionPicked = Math.floor(Math.random() * Math.floor(11));
    $scope.questionPicked = Math.floor(Math.random() * Math.floor(10));
        if(!$scope.isGameStarted && $scope.firstName && $scope.firstName.length && $scope.mode.length){
            $scope.isGameStarted = true;    
            console.log(' $scope.questionPicked :',  $scope.questionPicked);  
            $scope.questionData = questions[$scope.mode];
            $scope.answer = $scope.questionData["words"][$scope.questionPicked];
            console.log(' $scope.answer.length :',  $scope.answer);  
            $scope.totalChances = $scope.answer.length + $scope.answer.length;
            $scope.totalScore = $scope.totalChances;
            for(var i = 0;i < $scope.answer.length; i++){
                $scope.lettersMatched.push("-");
                $scope.answerToCheck.push($scope.answer[i]);
            } 
            console.log('$scope.lettersMatched :',$scope.lettersMatched);
            $scope.hint = $scope.questionData["hint"][$scope.questionPicked];
            $scope.moreHint = $scope.questionData["more_hint"][$scope.questionPicked];
        }
        else if(!$scope.firstName.length){
            alert("Please enter your name to start");
        }
        else if(!$scope.mode.length){
            alert("Please select mode");
         }
  }

  $scope.checkAnswer = function(){
      console.log('checkAnswer');
      console.log('un matched :', $scope.totalScore);
    if($scope.userGuess === $scope.answer){
        $scope.gameOver = true;
        $scope.winMessage = 'Yay you have won the game !!!';
        $scope.scoreMessage= " Your scrore is : " + $scope.totalScore*10;
    }
    else{
        $scope.gameOver = true;
        $scope.looseMessage = 'You have lost the game';
        $scope.corectAnswer = 'The correct answer is : ' +$scope.answer;
    }
  }

  $scope.answerChanged = function(){
      if($scope.inputMode === 'letter'){
        console.log('answer changed');
        $scope.takenTurns++;
        var index = $scope.answerToCheck.indexOf($scope.userGuess);
        console.log('index :',index); 
        if(index > -1){
            console.log('matched :',index);
            $scope.lettersMatched[index] = $scope.userGuess;
            $scope.answerToCheck[index] = "-";
            if($scope.lettersMatched.indexOf("-") === -1)
            {
                $scope.gameOver = true;
                $scope.winMessage = 'Yay you have won the Game !!!';
                $scope.scoreMessage = 'Your scrore is : ' +$scope.totalScore*10 ;   
                return;
            }
        } else {
            $scope.totalScore--;
            console.log('un matched :', $scope.totalScore);
        }
        $scope.userGuess = '';
        if($scope.takenTurns >= $scope.totalChances){
            $scope.gameOver = true;
            $scope.looseMessage = 'You have lost the game';
            $scope.corectAnswer= 'The correct answer is : ' +$scope.answer;
        }
     }
  }

    $scope.showMoreHint = function(){
        $scope.showHintClicked = true;
        $scope.lettersMatched = [];
        for(var i = 0;i < $scope.moreHint.length; i++){
            if($scope.moreHint[i] === "*") {
                $scope.lettersMatched.push("-");
            } else{
                $scope.lettersMatched.push($scope.moreHint[i]);
                $scope.answerToCheck[i] = "-";
            }
        } 
    }

    $scope.showAnswer = function(){
        $scope.gameOver = true;
        $scope.looseMessage = 'You have lost the game';
        $scope.corectAnswer = 'The correct answer is :' +$scope.answer;
    }

  $scope.resetVariables = function(){
    // $scope.firstName = "";
    $scope.isGameStarted = false;
    $scope.mode = '';
    $scope.questionPicked = 0;
    $scope.questionData = undefined;
    $scope.answer = "";
    $scope.hint = "";
    $scope.moreHint = "";
    $scope.userGuess = "";
    $scope.totalTurns = 0;
    $scope.takenTurns = 0;
    $scope.moreClue = false;
    $scope.inputMode = "letter";
    $scope.gameOver = false;
    $scope.lettersMatched = [];
    $scope.answerToCheck = [];
    $scope.totalScore = 0;
    $scope.showHintClicked = false;
    $scope.winMessage = "";
    $scope.looseMessage = "";
    $scope.scoreMessage = "";
    $scope.corectAnswer = "";
    // $window.location.reload();
  }


});