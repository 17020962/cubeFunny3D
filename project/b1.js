var camera, scene, renderer;
var geometry, material, mesh, cube, controls;
var t = 10;

init();
animate();

function init() {
    var loader = new THREE.TextureLoader();

    var color = loader.load('https://kenh14cdn.com/2017/21314351-1985353301736209-4990432823795657711-n-1505119169311.jpg');
    var displace = loader.load('https://i.postimg.cc/GpssxYD3/displace.jpg');

    var light = new THREE.AmbientLight(0xfaf7f7);

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
    camera.position.z = 3;
    camera.position.y = 1;

    scene = new THREE.Scene();


    geometry = new THREE.BoxGeometry(1, 1, 1);
    material = new THREE.MeshPhongMaterial({
        map: color,
        displacementMap: displace,
        color: new THREE.Color(0xfaf7f7),
    });

    mesh = new THREE.Mesh(geometry, material);
    mesh.scale.x = 0.5;
    mesh.scale.y = 0.5;
    mesh.scale.z = 0.5;

    scene.add(light);
    scene.add(mesh);


    let materialArray = [
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("https://static1.ohman.vn/YanNews/2167221/201811/hotgirl-trung-quoc-voi-ve-dep-trong-vat-daobao-20181113-051822.jpg"), side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("https://vnn-imgs-f.vgcloud.vn/2019/05/03/11/co-gai-khien-hot-girl-tram-anh-bi-lu-mo-vi-qua-xinh-dep-3.jpg"), side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("https://genknews.genkcdn.vn/2019/5/9/photo-1-15574035378131752203878.jpeg"), side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("https://vnn-imgs-f.vgcloud.vn/2019/05/03/11/co-gai-khien-hot-girl-tram-anh-bi-lu-mo-vi-qua-xinh-dep-3.jpg"), side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("https://kenh14cdn.com/2017/21314351-1985353301736209-4990432823795657711-n-1505119169311.jpg"), side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("https://genknews.genkcdn.vn/2019/5/9/photo-1-15574035378131752203878.jpeg"), side: THREE.DoubleSide }),
    ];


    // create material color or image texture
    var material1 = new THREE.MeshFaceMaterial(materialArray);
    cube = new THREE.Mesh(geometry, material1);
    cube.scale.x = 0.5;
    cube.scale.y = 0.5;
    cube.scale.z = 0.5;
    cube.position.y = 2;
    scene.add(cube);
    mesh.visible = false;



    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xf2f2f2, 1);
    document.body.appendChild(renderer.domElement);
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    window.addEventListener('resize', function () {
        var width = window.innerWidth;
        var height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });

}

function animate() {

    requestAnimationFrame(animate);

    cube.rotation.y += 0.01;
    if (cube.position.y > 0) {
        cube.position.y -= 0.02;
    }
    // console.log(cube.position.y);


    //mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;
    if (cube.position.y <= 0) {
        if (mesh.scale.x <= 1) {
            mesh.scale.x += 0.01;
            mesh.scale.y += 0.01;
            mesh.scale.z += 0.01;
        }
        mesh.visible = true;
        cube.visible = true;
        t++;
    }
    
    if(t >=200 ){
        mesh.visible = false;
        if(cube.scale.x < 1.5){
            cube.scale.x += 0.01;
            cube.scale.y += 0.01;
            cube.scale.z += 0.01;
        }
    }


    renderer.render(scene, camera);

}
