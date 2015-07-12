$(document).ready(function(){

    var foodList = [
        'African',
        'American',
        'Asian',
        'BBQ',
        'Brazilian',
        'Breakfast',
        'Burgers',
        'Cajun',
        'Chinese',
        'Cuban',
        'Italian',
        'Mediterranean',
        'Mexican',
        'Middle Eastern',
        'Pizza',
        'Sandwiches',
        'Hoagie',
        'Sushi',
        'Thai',
        'Vegetarian',
        'Cheese Steaks',
        'Fast Food'
    ];
    var randomFood = []
    var selectedFood = [];
    var updatedFoodList = foodList;

    //check saved lists in local storage
    function checkSave(){

        if (localStorage.getItem("savedFood") && localStorage.getItem("foodList") !== null) {

            var selectedStored = JSON.parse(localStorage["savedFood"]);
            var listStored = JSON.parse(localStorage["foodList"]);

            selectedFood = selectedStored;
            updatedFoodList = listStored;

        }else{

            selectedFood = [];
            updatedFoodList = foodList;

        }

    };

    checkSave();


    // create right side list
    function generateList (){

        //testing if there is already local storage data
        if (updatedFoodList.length < 1) {
            var arrayLength = foodList.length;
            for (var i = 0; i < arrayLength; i++) {
                $('#listHolder ul').append('<li>' + foodList[i] + '</li>');
            }

        }else {

            var arrayLength = updatedFoodList.length;
            for (var i = 0; i < arrayLength; i++) {
                $('#listHolder ul').append('<li>' + updatedFoodList[i] + '</li>');
            }
        }
    };
    generateList();

    //create selected cuisine list
    function generateSelectedFood(){

        var arrayLength = selectedFood.length;
        for (var i = 0; i < arrayLength; i++) {
            $('#selection-container').prepend('<li>' + selectedFood[i] + '</li>');

        }
        $( '#selection-container li:nth-child(1)' ).addClass('animated bounceIn');

    };
    generateSelectedFood();

    //move data and regenerate list
    $('#listHolder').on('click', 'li', function() {
        //$(this).addClass('animated bounceIn');
        //$(this).prependTo('#selection-container');
        var data = $(this).text();
        var pos = $(this).index('li');
        $(this).remove();
        updatedFoodList.splice(pos, 1);
        selectedFood.push(data);
        $('#selection-container').html('');
        generateSelectedFood();
        //var foodName = $(this).text();
        //console.log(randomFood);

    });

    $('#selection-container').on('click', 'li', function() {
        var data = $(this).text();
        var pos = $(this).index('#selection-container li');
        var that = $(this);

        $(this).addClass('animated bounceOut');
        setTimeout(function(){
            $(that).remove()

        }, 1000);
        selectedFood.splice(pos, 1);
        updatedFoodList.push(data);
        $('#listHolder ul').html('');
        generateList();
    });



    $('#saveIt').on('click', function(){
        localStorage["savedFood"] = JSON.stringify(selectedFood);
        localStorage["foodList"] = JSON.stringify(updatedFoodList);

    });


    $('#clear').on('click', function(){
        randomFood = [];
        selectedFood = [];
        updatedFoodList = foodList;
        localStorage["savedFood"] = JSON.stringify(selectedFood);
        localStorage["foodList"] = JSON.stringify(updatedFoodList);
        $('#selection-container').html('');
        $('#listHolder ul').html('');
        generateSelectedFood();
        generateList();

    });

    function selectAll (){
        var arrayLength = updatedFoodList.length;
        for (var i = 0; i < arrayLength; i++) {
            selectedFood.push(updatedFoodList[i]);
        }
        $('#listHolder ul').html('');
        generateSelectedFood();
        generateList();

    }


    $('#selectAll').on('click', function(){
        $('#selection-container').html('');
        selectAll();
    });


    function showResults(){
        $.magnificPopup.open({
            items: {
                src: '#results',
                type: 'inline'
            }
        });
    };


    //randomizing array
    function shuffle(randomFood) {
        var currentIndex = randomFood.length, temporaryValue, randomIndex ;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = randomFood[currentIndex];
            randomFood[currentIndex] = randomFood[randomIndex];
            randomFood[randomIndex] = temporaryValue;
        }

        return randomFood;
    }


    function getResults(){
        randomFood = selectedFood;
        shuffle(randomFood);
        $('#result').hide();
        $('#deciding').show();
        showResults();
        setTimeout(function () {
            $('#deciding').hide();
            $('#result').text(randomFood[0]);
            $('#result').show();
        }, 3000);

    };

    $('#start').on('click', function(){

        getResults()
    });

    $('#startPop').on('click', function(){
        getResults()
    });

    $('#addItem').on('click', function(){
        var newItem = $('#itemfield').val();
        selectedFood.push(newItem);
        $('#selection-container').html('');
        generateSelectedFood();
        $('#itemfield').val('');

    });

    $('#openAdd').magnificPopup({
        items: {
            src: '#addPopup',
            type: 'inline'
        }
    });


});