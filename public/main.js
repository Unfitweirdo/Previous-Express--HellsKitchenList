let completeFood = document.getElementsByClassName("completeFood");
let clearBasket = document.getElementById("clearBasket");


Array.from(completeFood).forEach(function (element) {
    element.addEventListener('click', function (event) {
        const foodTasks = this.parentNode.childNodes[1].innerText
        fetch('/foodTasks', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'tasks': foodTasks,
                'completedFood': false
            })
        })
            .then(response => {
                if (response.ok) return response.json()
            })
            .then(data => {
                console.log(data)
                window.location.reload(true)
            })
    });
});



Array.from(clear).forEach(function (element) {
    element.addEventListener('click', function () {
        fetch('/clearFood', {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

            })
        }).then(function (response) {
            window.location.reload()
        })
    });
});