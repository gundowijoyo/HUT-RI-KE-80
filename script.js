// Inisialisasi Three.js scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a1a3a);
scene.fog = new THREE.FogExp2(0x0a1a3a, 0.002);

// Setup kamera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 15);

// Setup renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Pencahayaan
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const sunLight = new THREE.DirectionalLight(0xffecd2, 1);
sunLight.position.set(10, 20, 10);
scene.add(sunLight);

// Efek bintang di langit
function createStars() {
const starsGeometry = new THREE.BufferGeometry();
const starsMaterial = new THREE.PointsMaterial({
color: 0xffffff,
size: 0.2,
transparent: true,
opacity: 0.8
});

const starsVertices = [];
for (let i = 0; i < 5000; i++) {
const x = (Math.random() - 0.5) * 1000;
const y = (Math.random() - 0.5) * 1000;
const z = (Math.random() - 0.5) * 1000;
starsVertices.push(x, y, z);
}

starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);
}

createStars();

// Gunung-gunung
function createMountains() {
const mountainGroup = new THREE.Group();

for (let i = 0; i < 8; i++) {
const height = 5 + Math.random() * 8;
const width = 10 + Math.random() * 10;
const depth = 5 + Math.random() * 5;
const mountainGeometry = new THREE.ConeGeometry(width, height, 4, 1);
const mountainMaterial = new THREE.MeshPhongMaterial({ 
color: i % 2 === 0 ? 0x2c4d2e : 0x3a6b3d,
shininess: 20,
flatShading: true
});

const mountain = new THREE.Mesh(mountainGeometry, mountainMaterial);
mountain.position.x = (i - 4) * 15;
mountain.position.y = height / 2 - 5;
mountain.position.z = -30 - Math.random() * 20;
mountain.rotation.y = Math.random() * Math.PI;

mountainGroup.add(mountain);
}

scene.add(mountainGroup);
return mountainGroup;
}

const mountains = createMountains();

// Bendera Merah Putih
function createFlag() {
const flagGroup = new THREE.Group();

// Tiang bendera
const poleGeometry = new THREE.CylinderGeometry(0.2, 0.2, 10, 16);
const poleMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 });
const pole = new THREE.Mesh(poleGeometry, poleMaterial);
pole.position.y = 5;
flagGroup.add(pole);

// Bendera (dibuat dengan plane untuk simulasi sederhana)
const flagGeometry = new THREE.PlaneGeometry(3, 2);
const flagMaterial = new THREE.MeshPhongMaterial({
color: 0xffffff,
side: THREE.DoubleSide,
transparent: true,
opacity: 0.9
});

const flag = new THREE.Mesh(flagGeometry, flagMaterial);
flag.position.set(1.5, 5, 0);
flagGroup.add(flag);

// Bagian merah bendera
const redFlagGeometry = new THREE.PlaneGeometry(3, 1);
const redFlagMaterial = new THREE.MeshPhongMaterial({
color: 0xff0000,
side: THREE.DoubleSide,
transparent: true,
opacity: 0.9
});

const redFlag = new THREE.Mesh(redFlagGeometry, redFlagMaterial);
redFlag.position.set(1.5, 5.5, 0.01);
flagGroup.add(redFlag);

// Animasi bendera sederhana
flagGroup.rotation.y = Math.PI / 4;
flagGroup.position.set(0, -2, -20);

scene.add(flagGroup);
return flagGroup;
}

const flag = createFlag();

// Burung Garuda
function createGaruda() {
const garudaGroup = new THREE.Group();

// Badan burung
const bodyGeometry = new THREE.SphereGeometry(0.5, 16, 16);
const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0xffcc00 });
const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
garudaGroup.add(body);

// Kepala
const headGeometry = new THREE.SphereGeometry(0.3, 16, 16);
const head = new THREE.Mesh(headGeometry, bodyMaterial);
head.position.y = 0.6;
head.position.z = 0.4;
garudaGroup.add(head);

// Mata
const eyeGeometry = new THREE.SphereGeometry(0.05, 8, 8);
const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
leftEye.position.set(0.1, 0.65, 0.65);
garudaGroup.add(leftEye);

const rightEye = leftEye.clone();
rightEye.position.x = -0.1;
garudaGroup.add(rightEye);

// Sayap
const wingGeometry = new THREE.ConeGeometry(0.8, 0.1, 4);
const wingMaterial = new THREE.MeshPhongMaterial({ color: 0xffcc00 });
const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
leftWing.position.set(0.7, 0.2, 0);
leftWing.rotation.z = Math.PI / 2;
garudaGroup.add(leftWing);

const rightWing = leftWing.clone();
rightWing.position.x = -0.7;
garudaGroup.add(rightWing);

// Ekor
const tailGeometry = new THREE.ConeGeometry(0.3, 0.7, 4);
const tail = new THREE.Mesh(tailGeometry, wingMaterial);
tail.position.set(0, -0.3, -0.5);
tail.rotation.x = Math.PI / 2;
garudaGroup.add(tail);

garudaGroup.scale.set(1.5, 1.5, 1.5);
garudaGroup.position.set(0, 10, -30);

scene.add(garudaGroup);
return garudaGroup;
}

const garudas = [];
for (let i = 0; i < 20; i++) {
const garuda = createGaruda();
garudas.push(garuda);
}

// Kembang api
const fireworks = [];
function createFirework(x, y, z, color) {
const fireworkGroup = new THREE.Group();
const particles = 100;
const particleGeometry = new THREE.SphereGeometry(0.1, 8, 8);
const particleMaterial = new THREE.MeshBasicMaterial({ color: color });

for (let i = 0; i < particles; i++) {
const particle = new THREE.Mesh(particleGeometry, particleMaterial);

// Posisi awal di pusat
particle.position.set(0, 0, 0);

// Arah acak
const angle1 = Math.random() * Math.PI * 2;
const angle2 = Math.random() * Math.PI;
const speed = 0.5 + Math.random() * 1;

particle.userData = {
velocity: new THREE.Vector3(
Math.sin(angle1) * Math.cos(angle2) * speed,
Math.sin(angle2) * speed,
Math.cos(angle1) * Math.cos(angle2) * speed
),
life: 2 + Math.random() * 1
};

fireworkGroup.add(particle);
}

fireworkGroup.position.set(x, y, z);
scene.add(fireworkGroup);
fireworks.push(fireworkGroup);
}

// Efek matahari
function createSun() {
const sunGeometry = new THREE.SphereGeometry(3, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({
color: 0xffdd55,
transparent: true,
opacity: 0.7
});

const sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.position.set(15, 15, -50);
scene.add(sun);

// Efek sinar matahari
const sunRayGeometry = new THREE.BufferGeometry();
const vertices = [];
const rayCount = 30;

for (let i = 0; i < rayCount; i++) {
const angle = (i / rayCount) * Math.PI * 2;
const length = 5 + Math.random() * 3;

vertices.push(0, 0, 0);
vertices.push(Math.cos(angle) * length, Math.sin(angle) * length, 0);
}

sunRayGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
const sunRayMaterial = new THREE.LineBasicMaterial({ 
color: 0xffdd55,
transparent: true,
opacity: 0.5
});

const sunRays = new THREE.LineSegments(sunRayGeometry, sunRayMaterial);
sun.add(sunRays);

return sun;
}

const sun = createSun();

// Animasi
let time = 0;
let lastScrollY = window.scrollY;

function animate() {
requestAnimationFrame(animate);
time += 0.01;

// Animasi gunung
mountains.rotation.y = time * 0.01;

// Animasi bendera
flag.rotation.y = Math.PI / 4 + Math.sin(time * 0.5) * 0.1;

// Animasi burung Garuda (terbang membentuk angka 80)
garudas.forEach((garuda, index) => {
const angle = (index / garudas.length) * Math.PI * 2;
const radius = index < garudas.length / 2 ? 4 : 6;
const offset = index < garudas.length / 2 ? 0 : Math.PI;

const x = Math.cos(time * 0.5 + angle + offset) * radius;
const y = Math.sin(time * 0.5 + angle * 2) * 1 + 10;
const z = Math.sin(time * 0.5 + angle + offset) * radius - 30;

garuda.position.set(x, y, z);
garuda.rotation.y = time;

// Sayap mengepak
const wing = garuda.children.find(child => child.position.x > 0);
if (wing) {
wing.rotation.x = Math.sin(time * 10 + index) * 0.5;
}
});

// Animasi kembang api
for (let i = fireworks.length - 1; i >= 0; i--) {
const firework = fireworks[i];
let allDead = true;

for (let j = 0; j < firework.children.length; j++) {
const particle = firework.children[j];

if (particle.userData.life > 0) {
particle.userData.life -= 0.016;
particle.position.add(particle.userData.velocity);
particle.userData.velocity.y -= 0.01; // Gravitasi
particle.material.opacity = particle.userData.life;
allDead = false;
}
}

if (allDead) {
scene.remove(firework);
fireworks.splice(i, 1);
}
}

// Animasi matahari
sun.rotation.z = time * 0.05;

// Kontrol kamera berdasarkan scroll
const scrollY = window.scrollY;
const scrollProgress = Math.min(scrollY / (document.body.scrollHeight - window.innerHeight), 1);

camera.position.y = 5 + scrollProgress * 10;
camera.position.z = 15 - scrollProgress * 30;

// Jika mencapai bagian akhir, munculkan kembang api
if (scrollProgress > 0.95 && scrollY > lastScrollY) {
const x = (Math.random() - 0.5) * 20;
const y = 5 + Math.random() * 10;
const z = -20 - Math.random() * 20;
const color = Math.random() > 0.5 ? 0xff0000 : 0xffffff;
createFirework(x, y, z, color);
}

lastScrollY = scrollY;

renderer.render(scene, camera);
}

animate();

// Resize handler
window.addEventListener('resize', () => {
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth, window.innerHeight);
});

// Kontrol orbit mouse
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.minDistance = 5;
controls.maxDistance = 50;

// Sembunyikan petunjuk scroll setelah digulir
window.addEventListener('scroll', () => {
const scrollHint = document.querySelector('.scroll-hint');
if (window.scrollY > 100) {
scrollHint.style.opacity = '0';
scrollHint.style.visibility = 'hidden';
} else {
scrollHint.style.opacity = '1';
scrollHint.style.visibility = 'visible';
}
});

// Tambahkan kembang api secara periodik
setInterval(() => {
if (Math.random() > 0.7) {
const x = (Math.random() - 0.5) * 20;
const y = 5 + Math.random() * 10;
const z = -20 - Math.random() * 20;
const color = Math.random() > 0.5 ? 0xff0000 : 0xffffff;
createFirework(x, y, z, color);
}
}, 3000);
