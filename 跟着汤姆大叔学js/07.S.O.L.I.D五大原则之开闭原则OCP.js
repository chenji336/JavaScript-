// http://www.cnblogs.com/TomXu/archive/2012/01/09/2306329.html
// 项目完工的时候我们是不希望去修改主程序的，我们需要修改的是常常需要修改的
// http://blog.csdn.net/sinat_35551809/article/details/52021536
// 对扩展开发，对修改封闭
// 修改及其可能导致错误，但是扩展的话就比较独立了，也比较好发现，一个开发完工的产品，大家也不喜欢你们去修改它
window.onload = function() {
    // var AnswerType={input:'input',choice:'choice'};//是不是我类型都定义错了，应该是一个枚举类型
    //没有使用开闭原则之前
    /*var AnswerType={input:0,choice:1};
    function question(label,answerType,choices){
    	return {
    		label:label,
    		answerType:answerType,
    		choices:choices
    	};
    }

    //让自己先运行一遍，后面就不需要运行了
    var view=(function(){

    	var render =function(target,q){
    		var question=document.createElement('div');
    		question.className='question';
    		var label=document.createElement('div');
    		label.className='label';
    		var labelText=document.createTextNode(q.label);
    		//如何把labelText加到label中(也是用appendChild)
    		label.appendChild(labelText);
    		
    		question.appendChild(label);
    		if(q.answerType==AnswerType.input){
    			var inputContent=document.createElement('input');
    			inputContent.type='text';
    			question.appendChild(inputContent);
    		}else if(q.answerType==AnswerType.choice){
    			var select=document.createElement('select');
    			var choices=q.choices;
    			for(var i=0;i<choices.length;i++){
    				var option=document.createElement('option');
    				option.value=choices[i];
    				option.text=choices[i];
    				select.appendChild(option);
    			}
    			question.appendChild(select);
    		}

    		target.appendChild(question);
    		
    	};


    	return {'target':function(target,questions){
    		for(var i=0;i<questions.length;i++){
    			var q=questions[i];
    			render(target,q);
    		}
    	}};
    })();

    var questions=[question('请输入你觉得正确的答案！',AnswerType.input),question('请从下面选出正确答案！',AnswerType.choice,['yes','no'])];
    var target=document.getElementById('questions');
    view.target(target,questions);*/


    //使用开闭原则之后
    function questionCreator(spec, my) {
        var my = my || {},
            that = {};

        my.renderInput = function() {
            throw 'not implement';
        }

        that.render = function(questionRegion) {
            var questionWrapper = document.createElement('div');
            questionWrapper.className = 'question';
            var questionLabel = document.createElement('div');
            questionLabel.className = 'label';
            var label = document.createTextNode(spec.label);
            questionLabel.appendChild(label);

            var questionAnswer = document.createElement('div');
            var input = my.renderInput(spec);
            questionAnswer.appendChild(input);

            questionWrapper.appendChild(questionLabel);
            questionWrapper.appendChild(questionAnswer);
            questionRegion.appendChild(questionWrapper);
        }

        return that;
    }

    function choiceQuestionCreator(spec) {
        var my = {},
            that = {};

        that = questionCreator(spec, my);

        my.renderInput = function() {
            var select = document.createElement('select');
            for (var i = 0; i < spec.choices.length; i++) {
                var option = document.createElement('option');
                option.value = spec.choices[i];
                option.text = spec.choices[i];
                select.appendChild(option);
            }
            return select;
        };

        return that;
    }

    function inputQuestionCreator(spec) {
        var my = {},
            that = {};

        that = questionCreator(spec, my);

        my.renderInput = function() {
            var input = document.createElement('input');
            input.type = 'text';
            return input;
        };

        return that;
    }

    var view = (function() {
        return {
            'render': function(questionRegion, questions) {
                for (var i = 0; i < questions.length; i++) {
                    questions[i].render(questionRegion);
                }
            }
        }
    })();

    var questions = [inputQuestionCreator({ label: '五四运动的发起者是谁？' }), choiceQuestionCreator({ label: '你是女的吗？', choices: ['yes', 'no'] })];
    var questionRegion = document.getElementById('questions');

    view.render(questionRegion, questions);

}