let input = document.getElementById("input");
let container = document.getElementById("toDoContainer");

function newList() {
    if (input.value !== '') {
        let myObj = {
            content: input.value
        };
        listsObj.push(myObj);
        localStorage.setItem("lists", JSON.stringify(listsObj));
        input.value = '';

        window.location.reload();
    }
}

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        newList();
    }
});

function showLists() {
    if (localStorage.getItem('lists') == null) {
        listsObj = [];
    } else {
        listsObj = JSON.parse(localStorage.getItem('lists'));
    }

    listsObj.forEach(function (element, index) {
        content = element.content.charAt(0).toUpperCase() + element.content.slice(1);
        container.innerHTML += `
            <div class='appendDivStyle'>
                <p class='appendStyle'>${content}</p>
                <button type='button' class='btnStyle' id='${index}' onclick = 'deleteList(this.id)'><i class="far fa-trash-alt"></i></button>
            </div>
        `;
    });

}

function deleteList(index) {
    let confirmDel = confirm("Delete list?");
    if (confirmDel == true) {
        if (localStorage.getItem("lists") === null) {
            listsObj = [];
        } else {
            listsObj = JSON.parse(localStorage.getItem("lists"));
        }
        listsObj.splice(index, 1);
        localStorage.setItem("lists", JSON.stringify(listsObj));
        window.location.reload();
    }
}

showLists();