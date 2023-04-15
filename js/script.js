const addBtn = document.querySelector('#addbtn');
const nameInp = document.querySelector('#name');
const scoreInp = document.querySelector('#score');
const warn = document.querySelector('.enter>span');
const _ulList = document.querySelector('#norm-list');
const _minField = document.querySelector('#min');
const _maxField = document.querySelector('#max');
const _aveField = document.querySelector('#ave');
const selectGroup = document.querySelector('#selectG');
const inp = document.querySelector('#filter');
let _completed = [];
const _show = document.querySelector('#showbtn');
let selectGval = 'more';
const _ulFilter = document.querySelector('#filtredList');
const _spanFilter = document.querySelector('.controlers>span');
const _reset = document.querySelector('#reset') 

let flag = 1;
const scores=[];
let maxi = {
    name : 'noname',
    score : 0
}

let mini = {
    name : 'noname',
    score : 20
}
addBtn.addEventListener('click', function () {
    let name = nameInp.value;
    let score = Number(scoreInp.value);
    let aver=0;
    let stu ={
        name : name,
        score : score
    }
    if (
        score > 20 ||
        !(name) ||
        /[1-9]/.test(name) ||
        !(score)
    ) {
        warn.innerHTML = 'Please enter the field correctly.';
    } else {
        nameInp.value = '';
        scoreInp.value = '';
        nameInp.focus();
        warn.innerHTML = '';
        _ulList.innerHTML += `
         <li>
              <strong><span>${flag}.</span> ${name}</strong>
             <span>${score}</span>
        </li>`;
        scores[flag-1] = score;
        _completed[flag-1] = {
            name : name,
            score : score
        }
        aver = scores.reduce(myFunc);
        aver = (aver / scores.length).toFixed(2);
        _aveField.innerHTML = aver;
        if(score > maxi.score){
            maxi.score = score;
            maxi.name = name;
            _maxField.innerHTML = maxi.name+' with a score of '+ maxi.score;
        }
        if(score < mini.score){
            mini.score = score;
            mini.name = name;
            _minField.innerHTML = mini.name+' with a score of '+ mini.score;
        }
        
        flag++; 
    }
});

function _oninput(){
    let temp = this.value;
    if (/[a-z]/i.test(temp)) {
        temp = temp.substring(0, temp.lenght - 1);
        this.value = temp;
    }
}

scoreInp.addEventListener('input',_oninput);

function myFunc(total,num){
    return total + num;
}

inp.addEventListener('input',_oninput);

selectGroup.addEventListener('change',function (){
     selectGval = selectGroup.value;
});

_show.addEventListener('click',function (){
    let temp = Number(inp.value);
    let filter = [];
    _ulFilter.innerHTML = '';

    if( !(temp) ||
        temp > 20
    ){
        console.log('warn');
        _spanFilter.innerHTML = 'Enter the grade correctly';
    }else{
        _spanFilter.innerHTML = '';
        if(selectGval == 'equal'){
            filter = _completed.filter((val)=>{
                if(val.score == temp){
                    return val;
                }
            });

        }else if(selectGval == 'less'){
            filter = _completed.filter((val)=>{
                if(val.score < temp){
                    return val;
                }
            })
        }else{
            filter = _completed.filter((val)=>{
                if(val.score > temp){
                    return val;
                }
            })
        }
        filter.forEach((val,index)=>{
            _ulFilter.innerHTML += `
                         <li>
                            <strong><span>${index+1}.</span> ${val.name}</strong>
                            <span>${val.score}</span>
                        </li>
            `;
        })
    }
})

_reset.addEventListener('click',function (){
    flag =1;
    _completed = [];
    _ulList.innerHTML = '';
    _ulFilter.innerHTML = '';
    selectGval = 'more';
    selectGroup.value = 'more';
    warn.innerHTML = '';
    _spanFilter.innerHTML = '';
    maxi = {
        name : 'noname',
        score : 0
    }
    
    mini = {
        name : 'noname',
        score : 20
    }
    _maxField.innerHTML = '...';
    _minField.innerHTML = '...';
    _aveField.innerHTML = '0';
    inp.value = '';
})









