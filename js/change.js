function openImage(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }

function parseHTML(html) {
    const node = new DOMParser().parseFromString(html, "text/html").body.firstElementChild;
    // var t = document.createElement('template');
    // t.innerHTML = html;
    return node;
}

function addGenerateComparisonImage(content_tag, imageName, method_1_folder, method_2_folder, method_1_name, method_2_name) {
    
    // const content_tag = document.getElementById(imageName);
    // let parse = new DOMParser() <!--  width="${size}" height="${size}" -->
    var instance_of_img = `
    <figure class="cd-image-container is-visible">
            <img src="https://github.com/Gorluxor/SR-COMP/blob/main/${method_1_folder}/${imageName}.png?raw=True" alt="Original Image"> 
            <span class="cd-image-label" data-type="original">${method_1_name}</span>
            
            <div class="cd-resize-img" style="width: 50.118%;">
                <img src="https://github.com/Gorluxor/SR-COMP/blob/main/${method_2_folder}/${imageName}.png?raw=True" alt="Modified Image">
                <span class="cd-image-label" data-type="modified">${method_2_name}</span>
            </div>
            <span class="cd-handle cd-first" style="left: 50.118%;"></span>
    </figure>
    `;
    let new_tag = parseHTML(instance_of_img);
    
    content_tag.appendChild(new_tag);
}

function generateTabContent(imageName, tag){
    // Creates one tab which has all the images from different folders comparing againts Lanczos 
    

    // let parse = new DOMParser()
    let new_tag = parseHTML(`<div id="${imageName}" class="tabcontent"> </div>`);
    tag.appendChild(new_tag);
    

    // dictionary with keys as method names, and values as list containting [folder_name, method_name]
    var method_names = {
        "lanczos": ["extras-images_Lanczos", "Lancozs"],
        "real_esrgan": ["extras-images_RESRGAN", "Real-ESRGAN"],
        "bsrgan": ["extras-images-BSRGAN4", "BSRGAN"],
        "ScuNet_PSNR": ["extras-images-ScuNet_PSNR", "ScuNet PSNR"],
        "swinir4": ["extras-images_SwinIR4", "SwinIR4"],
        "original": ["ffhq_1024_20", "Original"],
        "esrgan": ["extras-images-ESRGAN", "ESRGAN"],
    }
    // for each over the dictionary and call the addGenerateComparisonImage function on other methods compared to lanczos by extracting data from the dictionary
    for (const [key, value] of Object.entries(method_names)) {
        if (key != "lanczos"){
            addGenerateComparisonImage(new_tag, imageName, value[0], method_names["lanczos"][0], value[1], method_names["lanczos"][1]);
        }
    }


}

function createChildren(size){
    var div_tag = document.getElementById("tab");
    var content_tag = document.getElementById("content");
    // console.log("Output of div_tag: ", div_tag.outerHTML);
    // console.log("Output of content_tag: ", content_tag.outerHTML);
    // get children of div_tag and call generateTabContent on each one of them
    var children = div_tag.children;
    // console.log("Out chidren: ", children);
    for (var i = 0; i < children.length; i++){
        generateTabContent(children[i].innerText, content_tag, size);
    }
}