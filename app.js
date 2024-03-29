const loadservices = () => {
    fetch("https://testing-8az5.onrender.com/services/?fbclid=IwAR3U2HcUZIb-g838SRROFdwrkgrNGkfSQtWsOu95VoG0cVnJoqfH9ZI70HE&format=json")
        .then(res => res.json())
        .then(data => displayservice(data));

    // catch((err)=> console.log(err));
};

loadservices();

const displayservice = (services) => {
    services.forEach((service) => {
        const parent = document.getElementById("service-container")
        const li = document.createElement("li")
        li.innerHTML = `
            <div class="card shadow h-100">
                            <div class="ratio ratio-16x9">
                                <img src=${service.image}
                                class="card-img-top" loading="lazy" alt="...">
                            </div>
                            <div class="card-body p-3 p-xl-5">
                                <h3 class="card-title h5">${service.name}</h3>
                                <p class="card-text">${service.description.slice(0, 40)}</p>
                                <div><a href="#" class="btn btn-primary">Details</a>
                                </div>
                            </div>
                        </div>
            `;
        parent.appendChild(li)
    });
}

const loaddoctors = (search) => {
    // console.log(search);
    document.getElementById("doctors").innerHTML="";
    document.getElementById("spinner").style.display="block";
    fetch(`https://testing-8az5.onrender.com/doctor/list/?search=${search?search:""}`)
    .then(res => res.json())
    .then(data=>{
        if(data.results.length > 0){
            document.getElementById("spinner").style.display="none";
            displaydoctors(data?.results);
        }
        else{
            document.getElementById("spinner").style.display="none";
            document.getElementById("doctors").innerHTML=`<img src="./images/nodata.png" alt="">`
        }
    }
        )



};
loaddoctors();

const displaydoctors = (doctors) =>{
    doctors?.forEach((doctor) =>{
        console.log(doctor);
        const parent= document.getElementById("doctors")
        const div= document.createElement("div")
        div.classList.add("doc-card")
        div.innerHTML= `
        <img class="doc-img" src=${doctor?.image} alt="">
                    <h4>${doctor?.full_name}</h4>
                    <h5>${doctor?.designation[0]}</h5>
                    <h6>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas, qui.</p>
            ${doctor.specialization.map((item) =>{
                return `<button>${item}</button>`
            })}
                    <button><a href="doc-details.html?doctorId=${doctor.id}" >Details</a></button>
        `;
        parent.appendChild(div);
    })

}

const loadDesignation =()=>{
    fetch("https://testing-8az5.onrender.com/doctor/designation/")
    .then(res=>res.json())
    .then(data=> {
        data.forEach((item)=>{
            const parent= document.getElementById("drop-deg")
            const li= document.createElement("li")
            li.classList.add("dropdown-item")
            li.innerText= item?.name
            parent.appendChild(li);
        })
    })
};
const loadSpecialization =()=>{
    fetch("https://testing-8az5.onrender.com/doctor/specialization/")
    .then(res=>res.json())
    .then(data=> {
        data.forEach((item)=>{
            const parent= document.getElementById("doctor-review")
            const div= document.createElement("div")
            div.classList.add("review-card")
            div.innerHTML = `<li onclick="loaddoctors('${item.name}')">${item.name}</li>`
            parent.appendChild(div);
        })
    })
};

const handleSearch = () =>{
    const value= document.getElementById("search").value;

    // console.log(value);
    loaddoctors(value)
}

loadDesignation();
loadSpecialization();