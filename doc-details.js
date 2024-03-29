const getParams = () =>{
    const param = new URLSearchParams(window.location.search).get("doctorId");
    fetch(`https://testing-8az5.onrender.com/doctor/list/${param}`)
    
    .then(res=>res.json())
    .then(data=>displayDetails(data))

    fetch(`https://testing-8az5.onrender.com/doctor/review/${param}`)
    .then(res=>res.json())
    .then(data=> console.log(data))

}

const doctorReview = (data) =>{
    data.forEach((item)=>{
        const parent= document.getElementById("drop-spec")
        const li= document.createElement("li")
        li.classList.add("dropdown-item")
        li.innerHTML = `<li onclick="loaddoctors('${item.name}')">${item.name}</li>`
        parent.appendChild(li);
    })
}

getParams();
const displayDetails = (doctor) =>{
    console.log(doctor);
    const parent= document.getElementById('doc-details')
    const div= document.createElement('div')
    div.classList.add("doc-details-container")
    div.innerHTML=`
    <div  class="doc-details-container d-flex justify-content-around g-4">
    <div class="doctor-image">
        <img src="${doctor.image}" 
        style="
        height: 150px;
        width: 150px;
        border-radius: 150px;
        " alt="">

    </div>

    <div class="doctor-info">
        <h1>${doctor.full_name}</h1>
        <h6>${doctor.designation}</h6>
        ${doctor.specialization.map(item =>{
            return `<button>${item}</button>`
        })
            }
        <p class="w-50">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo inventore corrupti suscipit enim veritatis natus tempore sunt quos, reiciendis nostrum.</p>
        <h4>Fees: ${doctor.fee} BDT</h4>
        <button>Take Appointment</button>
    </div>

</div>
    
    `
    parent.appendChild(div)
}