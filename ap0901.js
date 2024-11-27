//
// 応用プログラミング 第9,10回 自由課題 (ap0901.js)
// G38400-2023 拓殖太郎
//
"use strict"; // 厳格モード

// ライブラリをモジュールとして読み込む
import * as THREE from "three";
import { GUI } from "ili-gui";

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
  camera.position.set(0,10,0);
  camera.lookAt(5,5,-30);
  //bli1.2
  //camera.position.set(50,0,-120);
  //camera.lookAt(0,0,-38);

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
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load("map1-2.jpg");
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(130,160),
    new THREE.MeshLambertMaterial({map:texture})
  );
  plane.rotateX(-Math.PI/2);
  map1.add(plane);
  //建物
  const buildmaterial = new THREE.MeshLambertMaterial({color:'red'});
  const bil1 = new THREE.Mesh(
    new THREE.BoxGeometry(8,10,8),buildmaterial
  )
  bil1.position.set(5,15,-57);
  bil1.rotation.y = -Math.PI/9
  map1.add(bil1);

  const bil2 = new THREE.Mesh(
    new THREE.BoxGeometry(15,30,10),buildmaterial
  )
  bil2.position.set(-2,25,-46);
  bil2.rotation.y = -Math.PI/10
  map1.add(bil2);
  const bil2_2 = new THREE.Mesh(
    new THREE.BoxGeometry(20,30,7),buildmaterial
  )
  bil2_2.position.set(-6.6,25,-40);
  bil2_2.rotation.y = -Math.PI/11
  map1.add(bil2_2);
  const bil3 = new THREE.Mesh(
    new THREE.BoxGeometry(24,40,19),buildmaterial
  )
  bil3.position.set(-14.5,30,-23);
  bil3.rotation.y = -Math.PI/10
  map1.add(bil3);
  const bil3_2 = new THREE.Mesh(
    new THREE.BoxGeometry(2,5,4),buildmaterial
  )
  bil3_2.position.set(-7.5,12.5,-9);
  bil3_2.rotation.y = -Math.PI/10
  map1.add(bil3_2);
  //階段作るy20->10大きさ(x=4,y=10,z=2)
  const bil3_3 = new THREE.Group();
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
    bil3_3.add(step);
  }
  bil3_3.position.set(-12,10,-8.38);
  bil3_3.rotation.y = Math.PI/2.5
  map1.add(bil3_3);
  //地面体育館らへん
  const A_B = new THREE.Mesh(
    new THREE.BoxGeometry(24,10,55),
    new THREE.MeshLambertMaterial({color:0xeeeeee})
  );
  A_B.position.set(-11,5,-34)
  A_B.rotation.y = -Math.PI/10;
  map1.add(A_B);
  //岡体育館Bぐらい
  const gymBoka = new THREE.Mesh(
    new THREE.CylinderGeometry(5,5,25,12,12),
    new THREE.MeshLambertMaterial({color:0x892f1b})
  );
  gymBoka.rotation.x = Math.PI/2;
  gymBoka.rotation.z = Math.PI/10;
  gymBoka.position.set(5,5,-45)
  map1.add(gymBoka);
  //体育館AとBの間の階段
  const stepsA_B = new THREE.Group();
  for (let i = 0; i < 5; i++) {
    const stepHeight = 5/4;
    const stepDepth = 1;
    const stepWidth = 6;
    const stepGeometry = new THREE.BoxGeometry(stepWidth, stepHeight, stepDepth);
    const step = new THREE.Mesh(stepGeometry, buildmaterial);    
    step.position.set(
        1,
        (i * stepHeight) + stepHeight / 2,
        (i * stepDepth)
    );
    stepsA_B.add(step);
  }
  stepsA_B.position.set(5,3.8,-30);
  stepsA_B.rotation.y = -Math.PI/1.7
  scene.add(stepsA_B);



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