/* ===========================
   DATA SISWA (tetap seperti yang lu kasih)
   =========================== */
const students = {
  "demian dunov bahri al rizky": {
    nis:11512, password:"Qe14P7vC9I",
    grades:{
      "agama":36,"ppkn":57,"b indo":82,"infomatika":52,"matematika":42,"b.ingg":52,
      "sejarah":34,"olahraga":53,"Rekayasa Perangkat Lunak":51,"Ilmu Pengetahuan Alam Dan Sosial":98
    }
  },
  "arviano caesar azis": {
    nis:11491,password:"V26Qn73Xf",
    grades:{
      "agama":40,"ppkn":60,"b indo":82,"infomatika":77,"matematika":54,"b.ingg":92,
      "sejarah":58,"olahraga":57,"Rekayasa Perangkat Lunak":46,"Ilmu Pengetahuan Alam Dan Sosial":76
    }
  },
  "pandu ardan winata": {
    nis:11613,password:"H7vB61mJ8",
    grades:{
      "agama":42,"ppkn":63,"b indo":92,"infomatika":89,"matematika":59,"b.ingg":73,
      "sejarah":65,"olahraga":65,"Rekayasa Perangkat Lunak":55,"Ilmu Pengetahuan Alam Dan Sosial":72
    }
  },
  "muhammad raka pratama": {
    nis:11589,password:"r7Vn7Ky2o",
    grades:{
      "agama":39,"ppkn":50,"b indo":90,"infomatika":84,"matematika":38,"b.ingg":93,
      "sejarah":49,"olahraga":58,"Rekayasa Perangkat Lunak":46,"Ilmu Pengetahuan Alam Dan Sosial":88
    }
  },
  "muhammad irvan hakim": {
    nis:11583,password:"Vh6uG63Iv",
    grades:{
      "agama":51,"ppkn":50,"b indo":76,"infomatika":69,"matematika":51,"b.ingg":73,
      "sejarah":63,"olahraga":60,"Rekayasa Perangkat Lunak":45,"Ilmu Pengetahuan Alam Dan Sosial":66
    }
  },
  "altamis raffa aditya": {
    nis:11477,password:"Uq61Km26z",
    grades:{
      "agama":56,"ppkn":60,"b indo":92,"infomatika":87,"matematika":54,"b.ingg":86,
      "sejarah":54,"olahraga":57,"Rekayasa Perangkat Lunak":60,"Ilmu Pengetahuan Alam Dan Sosial":84
    }
  },
  "rasya andhika ash shofi": {
    nis:11623,password:"C26Bu9Ns51",
    grades:{
      "agama":58,"ppkn":60,"b indo":89,"infomatika":85,"matematika":53,"b.ingg":89,
      "sejarah":43,"olahraga":58,"Rekayasa Perangkat Lunak":59,"Ilmu Pengetahuan Alam Dan Sosial":80
    }
  },
  "muhammad tubagus alfarizi": {
    nis:11591,password:"M8nV93Q13Lu",
    grades:{
      "agama":52,"ppkn":53,"b indo":95,"infomatika":87,"matematika":59,"b.ingg":81,
      "sejarah":53,"olahraga":57,"Rekayasa Perangkat Lunak":57,"Ilmu Pengetahuan Alam Dan Sosial":73
    }
  }
};

/* ===========================
   Utilities
   =========================== */
function normalizeName(s){
  return String(s||"").toLowerCase().replace(/\s+/g," ").trim();
}
function setFeedback(msg, ok){
  const el = document.getElementById("login-feedback");
  el.textContent = msg || "";
  el.className = ok ? "hint small-muted success" : "hint small-muted error";
}

/* current found key (for download) */
let currentKey = null;

/* ===========================
   Main logic
   =========================== */
function onCheck(){
  const raw = document.getElementById("name").value;
  const pass = document.getElementById("password").value || "";
  const key = normalizeName(raw);

  setFeedback("Mencari...", true);

  // cari case-insensitive & spacing-insensitive
  let foundKey = null;
  for(const k in students){
    if(normalizeName(k) === key){
      foundKey = k;
      break;
    }
  }

  if(!foundKey){
    setTimeout(()=> setFeedback("Nama siswa tidak ditemukan.", false), 200);
    renderEmpty();
    currentKey = null;
    return;
  }

  const student = students[foundKey];
  if(student.password !== pass){
    setTimeout(()=> setFeedback("Password salah.", false), 200);
    renderEmpty();
    currentKey = null;
    return;
  }

  // sukses
  setFeedback("Data ditemukan. Menampilkan nilai...", true);
  currentKey = foundKey;
  renderStudent(foundKey, student);
  launchFireworks();
}

function renderStudent(name, data){
  document.getElementById("out-name").textContent = name;
  document.getElementById("out-nis").textContent = data.nis;
  document.getElementById("out-status").textContent = "Sukses";

  // update info-card
  document.getElementById("card-name").textContent = name;
  document.getElementById("card-nis").textContent = "NIS: " + data.nis;
  document.getElementById("card-status").textContent = "Status: Sukses";

  const tbody = document.getElementById("out-body");
  tbody.innerHTML = "";

  let total = 0, count = 0;
  const subjects = Object.keys(data.grades);
  subjects.sort((a,b)=> a.localeCompare(b, 'id'));

  for(const s of subjects){
    const v = data.grades[s];
    const tr = document.createElement("tr");
    const td1 = document.createElement("td"); td1.textContent = s;
    const td2 = document.createElement("td"); td2.style.textAlign = "right"; td2.textContent = (isFinite(v) ? v : "-");
    tr.appendChild(td1); tr.appendChild(td2);
    tbody.appendChild(tr);

    if(!isNaN(v) && isFinite(v)){ total += Number(v); count++; }
  }

  const avg = (count>0) ? (total/count) : 0;
  const avgRow = document.createElement("tr");
  avgRow.className = "avg-row";
  avgRow.innerHTML = `<td>Rata rata nilai</td><td style="text-align:right">${avg.toFixed(2)}</td>`;
  tbody.appendChild(avgRow);
}

function renderEmpty(){
  document.getElementById("out-name").textContent = "—";
  document.getElementById("out-nis").textContent = "—";
  document.getElementById("out-status").textContent = "Tidak ada";
  document.getElementById("out-body").innerHTML = '<tr><td colspan="2" style="padding:14px;color:#bcd7ff">Belum ada data — cek siswa dulu</td></tr>';
  // info-card reset
  document.getElementById("card-name").textContent = "—";
  document.getElementById("card-nis").textContent = "NIS: —";
  document.getElementById("card-status").textContent = "Status: —";
}

/* clear inputs */
function onClear(){
  document.getElementById("name").value = "";
  document.getElementById("password").value = "";
  setFeedback("");
  renderEmpty();
  currentKey = null;
}

/* download CSV */
function downloadReport(){
  if(!currentKey){
    alert("Tidak ada data untuk diunduh.");
    return;
  }
  const data = students[currentKey];
  if(!data){ alert("Data tidak ditemukan."); return; }

  let csv = "Mata Pelajaran,Nilai\r\n";
  for(const s of Object.keys(data.grades)){
    csv += `"${s.replace(/"/g,'""')}",${data.grades[s]}\r\n`;
  }
  let t=0,c=0; for(const v of Object.values(data.grades)){ if(!isNaN(v)){ t+=Number(v); c++ } }
  csv += `"Rata rata",${(c? (t/c).toFixed(2) : 0)}\r\n`;

  const blob = new Blob([csv], {type:"text/csv"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = `${currentKey.replace(/\s+/g,'_')}_nilai.csv`;
  document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}

/* FIREWORKS (lightweight) */
let fwCanvas=null;
function launchFireworks(){
  if(!fwCanvas){
    fwCanvas = document.createElement("canvas"); fwCanvas.className = "fireworks"; document.body.appendChild(fwCanvas);
    const resize = ()=> { fwCanvas.width = innerWidth; fwCanvas.height = innerHeight; }
    addEventListener("resize", resize); resize();
  }
  const ctx = fwCanvas.getContext("2d"); const particles = [];
  function rand(min,max){return Math.random()*(max-min)+min}
  function explode(x,y,color){
    const count = 40;
    for(let i=0;i<count;i++){
      particles.push({
        x,y,
        vx: Math.cos(i/count*Math.PI*2)*rand(1,5)*rand(-1,1),
        vy: Math.sin(i/count*Math.PI*2)*rand(1,5)*rand(-1,1),
        size: rand(1.2,3.6),
        life: rand(40,90),
        color
      });
    }
  }
  const colors = ["#ff6b6b","#ffd166","#8a2be2","#00bfff","#7efc81","#ff7ab6"];
  for(let i=0;i<6;i++){ setTimeout(()=> { explode(rand(100,innerWidth-100), rand(80, innerHeight/2), colors[Math.floor(rand(0,colors.length))]); }, i*220); }
  function loop(){
    ctx.clearRect(0,0,fwCanvas.width,fwCanvas.height);
    for(let i=particles.length-1;i>=0;i--){
      const p = particles[i];
      p.x += p.vx; p.y += p.vy; p.vy += 0.06; p.life--;
      ctx.globalAlpha = Math.max(0, p.life/90);
      ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2); ctx.fill();
      if(p.life<=0){ particles.splice(i,1); }
    }
    ctx.globalAlpha = 1;
    if(particles.length>0) requestAnimationFrame(loop); else { setTimeout(()=>{ if(fwCanvas) fwCanvas.remove(); fwCanvas=null; }, 600); }
  }
  loop();
}

/* toggle password eye */
function togglePassword(){
  const pw = document.getElementById("password");
  const eye = document.getElementById("eyeToggle");
  if(pw.type === "password"){
    pw.type = "text";
    eye.src = "eye-open.png"; // sekarang mata 'terbuka' icon
  } else {
    pw.type = "password";
    eye.src = "eye-closed.png";
  }
}

/* init: attach events */
document.addEventListener("DOMContentLoaded", ()=>{
  document.getElementById("btn-check").addEventListener("click", onCheck);
  document.getElementById("btn-clear").addEventListener("click", onClear);
  document.getElementById("btn-download").addEventListener("click", downloadReport);
  document.getElementById("eyeToggle").addEventListener("click", togglePassword);
  renderEmpty();
});
