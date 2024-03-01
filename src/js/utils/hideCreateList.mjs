export function hideCreateList() {
    const accessToken = localStorage.getItem("accessToken");
    const createList = document.getElementById("hideID");  
  
    if (!accessToken) {
      createList.classList.add("d-none");    
    } else if (createList) {
      createList.classList.remove("d-none");
    }  
};
  