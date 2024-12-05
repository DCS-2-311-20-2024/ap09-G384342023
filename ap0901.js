//
// 応用プログラミング 第9,10回 自由課題 (ap0901.js)
// G38400-2023 拓殖太郎
//
"use strict"; // 厳格モード

// ライブラリをモジュールとして読み込む
import * as THREE from "three";
import { GUI } from "ili-gui";

let stepsA_B,gymBokaB,micro;

// ３Ｄページ作成関数の定義
function init() {
  // 制御変数の定義
  const param = {
    axes: true, // 座標軸
  };

  // GUIコントローラの設定
  const gui = new GUI();
  gui.add(param, "axes").name("座標軸");

  // シーン作成
  const scene = new THREE.Scene();

  // 座標軸の設定
  const axes = new THREE.AxesHelper(18);
  scene.add(axes);

  // カメラの作成
  const camera = new THREE.PerspectiveCamera(
    50, window.innerWidth/window.innerHeight, 0.1, 1000);
  //俯瞰
  camera.position.set(0,250,0);
  camera.lookAt(0,0,0);


  // 環境ライト
  {
    const light = new THREE.AmbientLight();
    light.intensity=0.8;
    scene.add(light);
  }
  // スポットライト
  { 
    const light = new THREE.PointLight(0xffffff, 3000);
    light.position.set(0, 50, 0); 
    light.lookAt(0,0,0);
    scene.add(light);
  }

  // レンダラの設定
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, innerHeight);
  renderer.setClearColor(0xeeeeee); 
  document.getElementById("output").appendChild(renderer.domElement);
  
  // 描画処理
  // テクスチャの読み込み
  const map1 = new THREE.Group();
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(130,160),
    new THREE.MeshLambertMaterial({color:'white'})
  );
  plane.rotateX(-Math.PI/2);
  map1.add(plane);

  //建物
  const buildmaterial = new THREE.MeshLambertMaterial({color:0x111111});
  //A舘地面
    const Aground = new THREE.Group();
    const Ag1 = new THREE.Mesh(
      new THREE.BoxGeometry(14,20,80),
      new THREE.MeshLambertMaterial({color:0xeeeeee})
    )
    Ag1.position.set(-40,10,32.5)
    Ag1.rotation.y = -Math.PI/10;
    Aground.add(Ag1);
    const Ag2 = new THREE.Mesh(
      new THREE.BoxGeometry(6,10,30),
      new THREE.MeshLambertMaterial({color:0xeeeeee})
    )
    Ag2.position.set(-42,25,50)
    Ag2.rotation.y = -Math.PI/10;
    Aground.add(Ag2);
    map1.add(Aground) 
  //地面  体育館らへん
    const A_B = new THREE.Mesh(
      new THREE.BoxGeometry(28,10,70),
      new THREE.MeshLambertMaterial({color:0xeeeeee})
    );
    A_B.position.set(-11,5,-36.5)
    A_B.rotation.y = -Math.PI/10;
    map1.add(A_B);
  
  //岡体育館Bぐらい
    gymBokaB = new THREE.Group();
    const gymBokaB1 = new THREE.Mesh(
      new THREE.BoxGeometry(5,10,25),
      new THREE.MeshLambertMaterial({color:0xeeeeee})
    );
    gymBokaB1.position.set(9.65,4.5,-44.5);
    gymBokaB1.rotation.y = Math.PI/1.1;
    gymBokaB1.rotation.z = Math.PI/1.1;
    gymBokaB.add(gymBokaB1);
    const gymBokaB2 = new THREE.Mesh(
      new THREE.BoxGeometry(5,10,25),
      new THREE.MeshLambertMaterial({color:0xeeeeee})
    );
    gymBokaB2.position.set(8,5,-45);
    gymBokaB2.rotation.y = Math.PI/1.1;
    gymBokaB.add(gymBokaB2);
    scene.add(gymBokaB);
  
  //岡体育館Aぐらい
    const gymBokaA = gymBokaB.clone(true);
    gymBokaA.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone(); 
        child.geometry = child.geometry.clone(); 
      }
    });
    gymBokaA.position.set(-9.5,0.5,29.5)
    gymBokaA.rotation.y = 0.01
    scene.add(gymBokaA);
  
  //soko
    const soko = new THREE.Mesh(
      new THREE.BoxGeometry(8,10,8),buildmaterial
    )
    soko.position.set(5,15,-57);
    soko.rotation.y = -Math.PI/9
    map1.add(soko);
  
  //gymB
    const gymB = new THREE.Mesh(
      new THREE.BoxGeometry(15,30,10),buildmaterial
    )
    gymB.position.set(-2,25,-46);
    gymB.rotation.y = -Math.PI/10
    map1.add(gymB);
    const gymB_2 = new THREE.Mesh(
      new THREE.BoxGeometry(20,30,7),buildmaterial
    )
    gymB_2.position.set(-6.6,25,-40);
    gymB_2.rotation.y = -Math.PI/11
    map1.add(gymB_2);
  
  //gymA
    const gymA = new THREE.Mesh(
      new THREE.BoxGeometry(24,40,19),buildmaterial
    )
    gymA.position.set(-14.5,30,-23);
    gymA.rotation.y = -Math.PI/10
    map1.add(gymA);
    const gymA_2 = new THREE.Mesh(
      new THREE.BoxGeometry(2,5,4),buildmaterial
    )
    gymA_2.position.set(-7.5,12.5,-9);
    gymA_2.rotation.y = -Math.PI/10
    map1.add(gymA_2);

    //階段作るy20->10大きさ(x=4,y=10,z=2)
    const gymA_3 = new THREE.Group();
    {
    for (let i = 0; i < 4; i++) {
      const stepHeight = 5 / 4;
      const stepDepth = 1;
      const stepWidth = 2;
      const stepGeometry = new THREE.BoxGeometry(stepWidth, stepHeight, stepDepth);
      const step = new THREE.Mesh(stepGeometry, buildmaterial);    
      step.position.set(
          1,
          (i * stepHeight) + stepHeight / 2,
          (i * stepDepth)
      );
      gymA_3.add(step);
    }
    gymA_3.position.set(-12,10,-8.38);
    gymA_3.rotation.y = Math.PI/2.5
    map1.add(gymA_3);
  }
  
  //体育館AとBの間の階段
    stepsA_B = new THREE.Group();
    for (let i = 0; i < 8; i++) {
      const stepHeight = 5/4;
      const stepDepth = 1;
      const stepWidth = 6;
      const stepGeometry = new THREE.BoxGeometry(stepWidth, stepHeight, stepDepth);
      const step = new THREE.Mesh(stepGeometry, new THREE.MeshLambertMaterial({color:0xeeeeee}));    
      step.position.set(
          1,
          (i * stepHeight) + stepHeight / 2,
          (i * stepDepth)
      );
      stepsA_B.add(step);
    }
    stepsA_B.position.set(8,0.05,-30);
    stepsA_B.rotation.y = -Math.PI/1.7
    scene.add(stepsA_B);
  
  //体育館A横の階段
    const Asteps = stepsA_B.clone(true); 
    Asteps.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone(); 
        child.geometry = child.geometry.clone(); 
      }
    });

    Asteps.position.set(-1.5,0,-0.3);
    Asteps.rotation.y=-Math.PI/2.5
    map1.add(Asteps);
  //体育館とA舘の階段
    const A_Asteps = stepsA_B.clone(true);
    A_Asteps.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone(); 
        child.geometry = child.geometry.clone(); 
      }
    });
    A_Asteps.position.set(-24,10,-12.01);
    A_Asteps.rotation.y=Math.PI/0.909
    map1.add(A_Asteps);
  
  //りたく館
    const ritaku = new THREE.Mesh(
      new THREE.BoxGeometry(6,50,12),
      buildmaterial
    )
    ritaku.position.set(-30,35,-8);
    ritaku.rotation.y=-Math.PI/10
    map1.add(ritaku);
  //A舘
    const A = new THREE.Group();
    const A1 = new THREE.Mesh(
      new THREE.BoxGeometry(6,40,55),
      buildmaterial
    )
    A1.position.set(-42,40,30)
    A1.rotation.y = -Math.PI/10;
    A.add(A1);
    const A2 = new THREE.Mesh(
      new THREE.BoxGeometry(3,1,9),
      buildmaterial
    )
    A2.position.set(-37.7,30,31.7)
    A2.rotation.y = -Math.PI/10
    A.add(A2)
    map1.add(A);
  //マイクロ
    micro = new THREE.Mesh(
      new THREE.BoxGeometry(14,24,24),
      buildmaterial
    )
    micro.position.set(-18,12,13)
    micro.rotation.y = -Math.PI/10;
    map1.add(micro);
  //A舘とC舘階段
    const stepsA_C = new THREE.Group();
    for (let i = 0; i < 8; i++) {
      const stepHeight = 5/4;
      const stepDepth = 1;
      const stepWidth = 3;
      const stepGeometry = new THREE.BoxGeometry(stepWidth, stepHeight, stepDepth);
      const step = new THREE.Mesh(stepGeometry, new THREE.MeshLambertMaterial({color:0xeeeeee}));    
      step.position.set(
          1,
          (i * stepHeight) + stepHeight / 2,
          (i * stepDepth)
      );
      stepsA_C.add(step);
    }
    stepsA_C.position.set(-34.5,20,29);
    stepsA_C.rotation.y = -Math.PI/10
    scene.add(stepsA_C);
  //C舘
    const C = micro.clone();
    C.position.set(-33,18,60)
    C.scale.y = 1.5
    C.scale.x = 1.2
    map1.add(C);
  
//道
  const controlPoints1 = [
    [22, 1, -57],
    [-25, 1, 80]
  ];
  const course1 = new THREE.CatmullRomCurve3(
    controlPoints1.map((p) => new THREE.Vector3().set(p[0], p[1], p[2])),
    false
  );

  const controlPoints2 = [
    [-34,19,23],
    [-28,14,30],
    [-22,9,43],
    [-5,-25,59]
  ];
  const course2 = new THREE.CatmullRomCurve3(
    controlPoints2.map((p) => new THREE.Vector3().set(p[0], p[1], p[2])),
    false
  );

  function drawRoad(course, color, width) {
    const points = course.getPoints(100);
    points.forEach((point) => {
        const road = new THREE.Mesh(
            new THREE.CircleGeometry(width, 16),
            new THREE.MeshLambertMaterial({ color })
        );
        road.rotateX(-Math.PI / 2);
        road.position.set(point.x, point.y, point.z);
        scene.add(road);
    });
  }

  drawRoad(course1, "gray", 3);
  drawRoad(course2, "brown", 4);
//人オブジェクト
  function creatapeople(){
    const people = new THREE.Group();
    const peoplematelal = new THREE.MeshLambertMaterial({color:'bule'})
    const head = new THREE.Mesh(
      new THREE.SphereGeometry(1.2,16,16),peoplematelal
    );
    head.position.set(0,5,0);
    people.add(head);
    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2,0.2,3,16),peoplematelal
    )
    body.position.set(0,3,0);
    people.add(body)
    const leftleg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2,0.2,3,16),peoplematelal    
    )
    leftleg.position.set(-0.5,1,0)
    people.add(leftleg);
    const rightleg = leftleg.clone();
    rightleg.position.x = 0.5
    people.add(rightleg);
    const leftarmgroup = new THREE.Group();
    const leftarm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2,0.2,3,16),peoplematelal
    )
    leftarm.position.set(0, -1, 0);
    leftarmgroup.add(leftarm);
    leftarmgroup.position.set(-0.2,4,0)
    leftarmgroup.rotation.z = -Math.PI/10
    people.add(leftarmgroup);

    const rightarm = leftarmgroup.clone();
    rightarm.position.set(0.2, 4, 0);
    rightarm.rotation.z = Math.PI/10
    people.add(rightarm)
    
    return{people,head,body,leftarm,leftleg,rightarm,rightleg};
  }
//人歩くモーション作成
  function createPeopleGroup(num) {
    const peopleGroup = [];
    for (let i = 0; i < num; i++) {
      const { people: human, head, body, leftarm, leftleg, rightarm, rightleg } = creatapeople();
      human.position.set(
        Math.random() * 50 - 25, 
        0,
        Math.random() * 50 - 25 
      );
      peopleGroup[i] = human; 
      scene.add(human);
    }
    return peopleGroup;
  }
  const peopleGroup = createPeopleGroup(10);
  const clock = new THREE.Clock();
  const peopleposition = new THREE.Vector3();
  function animatePeople(peopleGroup, course) {
    function animate() {
      requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
  
      peopleGroup.forEach((human, index) => {
        const speed = (time / 30 + index * 0.1) % 1; 
        const position = new THREE.Vector3();
        course.getPointAt(speed, position); 
        human.position.copy(position);
  
        
        human.children[1].position.y = 3 + Math.abs(Math.sin(time * 4)) * 0.2; // 体上下動
        human.children[2].rotation.x = Math.sin(time * 4) * 0.5; 
        human.children[3].rotation.x = -Math.sin(time * 4) * 0.5; 
        human.children[4].rotation.x = -Math.sin(time * 4) * 0.5; 
        human.children[5].rotation.x = Math.sin(time * 4) * 0.5; 
      });
    }
    animate();
  }
  animatePeople(peopleGroup, course1);






//camera.position.set(10,40,40)
//camera.lookAt(-5,-25,59)



  scene.add(map1);
  // 描画関数
  function render() {
    // 座標軸の表示
    axes.visible = param.axes;
    // 描画
    renderer.render(scene, camera);
    // 次のフレームでの描画要請
    requestAnimationFrame(render);
  }

  // 描画開始
  render();
}

init();