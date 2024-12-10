//
// 応用プログラミング 第9,10回 自由課題 (ap0901.js)
// G38434-2023 北川 雅也
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
    follew: false,
  };

  // GUIコントローラの設定
  const gui = new GUI();
  gui.add(param, "axes").name("座標軸");
  gui.add(param, "follew").name("人目線")

  // シーン作成
  const scene = new THREE.Scene();

  // 座標軸の設定
  const axes = new THREE.AxesHelper(18);
  scene.add(axes);

  // カメラの作成
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
  const camera1 = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);


  // 環境ライト
  const light = new THREE.AmbientLight();
  light.intensity = 0.8;
  scene.add(light);
  // スポットライト 
  const spotlight = new THREE.PointLight(0xffffff, 3000);
  spotlight.position.set(0, 50, 0);
  spotlight.lookAt(0, 0, 0);
  scene.add(spotlight);


  // レンダラの設定
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, innerHeight);
  renderer.setClearColor(0xeeeeee);
  document.getElementById("output").appendChild(renderer.domElement);

  // 描画処理
  const map1 = new THREE.Group();
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(130, 160),
    new THREE.MeshLambertMaterial({ color: 0xcee6c1 })
  );
  plane.rotateX(-Math.PI / 2);
  map1.add(plane);

  //建物
  const buildmaterial = new THREE.MeshLambertMaterial({ color: 0xf0f0f0 });
  //A舘地面
  const Aground = new THREE.Group();
  const Ag1 = new THREE.Mesh(
    new THREE.BoxGeometry(14, 20, 80),
    new THREE.MeshLambertMaterial({ color: 0x666666 })
  )
  Ag1.position.set(-40, 10, 32.5)
  Ag1.rotation.y = -Math.PI / 10;
  Aground.add(Ag1);
  const Ag2 = new THREE.Mesh(
    new THREE.BoxGeometry(6, 10, 30),
    new THREE.MeshLambertMaterial({ color: 0x666666 })
  )
  Ag2.position.set(-42, 25, 50)
  Ag2.rotation.y = -Math.PI / 10;
  Aground.add(Ag2);
  map1.add(Aground)
  //地面  体育館らへん
  const A_B = new THREE.Mesh(
    new THREE.BoxGeometry(28, 10, 70),
    new THREE.MeshLambertMaterial({ color: 0x666666 })
  );
  A_B.position.set(-11, 5, -36.5)
  A_B.rotation.y = -Math.PI / 10;
  map1.add(A_B);

  //岡体育館Bぐらい
  const gymBokaB = new THREE.Group();
  const gymBokaB1 = new THREE.Mesh(
    new THREE.BoxGeometry(5, 10, 25),
    new THREE.MeshLambertMaterial({ color: 0x666666 })
  );
  gymBokaB1.position.set(9.65, 4.5, -44.5);
  gymBokaB1.rotation.y = Math.PI / 1.1;
  gymBokaB1.rotation.z = Math.PI / 1.1;
  gymBokaB.add(gymBokaB1);
  const gymBokaB2 = new THREE.Mesh(
    new THREE.BoxGeometry(5, 10, 25),
    new THREE.MeshLambertMaterial({ color: 0x666666 })
  );
  gymBokaB2.position.set(8, 5, -45);
  gymBokaB2.rotation.y = Math.PI / 1.1;
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
  gymBokaA.position.set(-9.5, 0.5, 29.5)
  gymBokaA.rotation.y = 0.01
  scene.add(gymBokaA);

  //購買前の坂
  const hillroad = new THREE.Mesh(
    new THREE.BoxGeometry(26, 1, 6),
    new THREE.MeshLambertMaterial({ color: 0x666666 })
  )
  hillroad.position.set(-22, 10, 28);
  hillroad.rotation.y = -Math.PI / 10;
  hillroad.rotation.z = -Math.PI / 3.89
  map1.add(hillroad)

  //soko
  const soko = new THREE.Mesh(
    new THREE.BoxGeometry(8, 10, 8), buildmaterial
  )
  soko.position.set(5, 15, -57);
  soko.rotation.y = -Math.PI / 9
  map1.add(soko);

  //gymB
  const gymB = new THREE.Mesh(
    new THREE.BoxGeometry(15, 30, 10), buildmaterial
  )
  gymB.position.set(-2, 25, -46);
  gymB.rotation.y = -Math.PI / 10
  map1.add(gymB);
  const gymB_2 = new THREE.Mesh(
    new THREE.BoxGeometry(20, 30, 7), buildmaterial
  )
  gymB_2.position.set(-6.6, 25, -40);
  gymB_2.rotation.y = -Math.PI / 11
  map1.add(gymB_2);

  //gymA
  const gymA = new THREE.Mesh(
    new THREE.BoxGeometry(24, 40, 19), buildmaterial
  )
  gymA.position.set(-14.5, 30, -23);
  gymA.rotation.y = -Math.PI / 10
  map1.add(gymA);
  const gymA_2 = new THREE.Mesh(
    new THREE.BoxGeometry(2, 5, 4), buildmaterial
  )
  gymA_2.position.set(-7.5, 12.5, -9);
  gymA_2.rotation.y = -Math.PI / 10
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
    gymA_3.position.set(-12, 10, -8.38);
    gymA_3.rotation.y = Math.PI / 2.5
    map1.add(gymA_3);
  }

  //体育館AとBの間の階段
  const stepsA_B = new THREE.Group();
  for (let i = 0; i < 8; i++) {
    const stepHeight = 5 / 4;
    const stepDepth = 1;
    const stepWidth = 6;
    const stepGeometry = new THREE.BoxGeometry(stepWidth, stepHeight, stepDepth);
    const step = new THREE.Mesh(stepGeometry, new THREE.MeshLambertMaterial({ color: 0x666666 }));
    step.position.set(
      1,
      (i * stepHeight) + stepHeight / 2,
      (i * stepDepth)
    );
    stepsA_B.add(step);
  }
  stepsA_B.position.set(8, 0.05, -30);
  stepsA_B.rotation.y = -Math.PI / 1.7
  scene.add(stepsA_B);

  //体育館A横の階段
  const Asteps = stepsA_B.clone(true);
  Asteps.traverse((child) => {
    if (child.isMesh) {
      child.material = child.material.clone();
      child.geometry = child.geometry.clone();
    }
  });

  Asteps.position.set(-1.5, 0, -0.3);
  Asteps.rotation.y = -Math.PI / 2.5
  map1.add(Asteps);
  //体育館とA舘の階段
  const A_Asteps = stepsA_B.clone(true);
  A_Asteps.traverse((child) => {
    if (child.isMesh) {
      child.material = child.material.clone();
      child.geometry = child.geometry.clone();
    }
  });
  A_Asteps.position.set(-24, 10, -12.01);
  A_Asteps.rotation.y = Math.PI / 0.909
  map1.add(A_Asteps);

  //りたく館
  const ritaku = new THREE.Mesh(
    new THREE.BoxGeometry(6, 50, 12),
    buildmaterial
  )
  ritaku.position.set(-30, 35, -8);
  ritaku.rotation.y = -Math.PI / 10
  map1.add(ritaku);
  //A舘
  const A = new THREE.Group();
  const A1 = new THREE.Mesh(
    new THREE.BoxGeometry(6, 40, 55),
    buildmaterial
  )
  A1.position.set(-42, 40, 30)
  A1.rotation.y = -Math.PI / 10;
  A.add(A1);
  const A2 = new THREE.Mesh(
    new THREE.BoxGeometry(3, 1, 9),
    buildmaterial
  )
  A2.position.set(-37.7, 30, 31.7)
  A2.rotation.y = -Math.PI / 10
  A.add(A2)
  map1.add(A);
  //マイクロ
  const micro = new THREE.Mesh(
    new THREE.BoxGeometry(14, 24, 24),
    buildmaterial
  )
  micro.position.set(-18, 12, 13)
  micro.rotation.y = -Math.PI / 10;
  map1.add(micro);
  //A舘とC舘階段
  const stepsA_C = new THREE.Group();
  for (let i = 0; i < 8; i++) {
    const stepHeight = 5 / 4;
    const stepDepth = 1;
    const stepWidth = 3;
    const stepGeometry = new THREE.BoxGeometry(stepWidth, stepHeight, stepDepth);
    const step = new THREE.Mesh(stepGeometry, new THREE.MeshLambertMaterial({ color: 0x666666 }));
    step.position.set(
      1,
      (i * stepHeight) + stepHeight / 2,
      (i * stepDepth)
    );
    stepsA_C.add(step);
  }
  stepsA_C.position.set(-34.5, 20, 29);
  stepsA_C.rotation.y = -Math.PI / 10
  scene.add(stepsA_C);
  //C舘
  const C = micro.clone();
  C.position.set(-33, 18, 60)
  C.scale.y = 1.5
  C.scale.x = 1.2
  map1.add(C)
  //グラウンド
  const ground = new THREE.Group();
  const groundmaterial = new THREE.MeshLambertMaterial({ color: 0x00b16b });
  const groundcenter = new THREE.Mesh(
    new THREE.BoxGeometry(24, 1, 30), groundmaterial
  )
  ground.add(groundcenter);
  const groundedgetop = new THREE.Mesh(
    new THREE.CylinderGeometry(12, 10, 1, 20), groundmaterial
  )
  groundedgetop.position.z = -15;
  ground.add(groundedgetop);
  const groundedgebottom = groundedgetop.clone();
  groundedgebottom.position.z = 15;
  ground.add(groundedgebottom);
  ground.rotation.y = -Math.PI / 10;
  ground.position.set(40, 1, -30);
  map1.add(ground);
  //道
  const controlPoints1 = [
    [22, 1, -57],
    [1.7, 1, 2],
    [-25, 1, 80]
  ];
  const course1 = new THREE.CatmullRomCurve3(
    controlPoints1.map((p) => new THREE.Vector3().set(p[0], p[1], p[2])),
    false
  );

  const controlPoints2 = [
    [-34, 19, 23],
    [-28, 14, 30],
    [-22, 9, 43],
    [-5, -20, 59]
  ];
  const course2 = new THREE.CatmullRomCurve3(
    controlPoints2.map((p) => new THREE.Vector3().set(p[0], p[1], p[2])),
    false
  );
  const controlPoints3 = [
    [22, 1, -57],
    [12.5, 2, -30],
    [1.7, 1, 2],
    [-8.5, 10, -1.5],
    [-19, 10, -6],
    [-18, 10, -11],
    [-22, 10, -14],
    [-25, 20, -4.5],
    [-33, 20, 28],
    [-36, 30, 36],
    [-43, 30, 60]
  ]
  const course3 = new THREE.CatmullRomCurve3(
    controlPoints3.map((p) => new THREE.Vector3().set(p[0], p[1], p[2])),
    false
  );
  const controlPoints4 = [
    [60, 1, 12],
    [30, 1, 10],
    [2, 1, 10],
    [10, 1, 0],
    [30, 1, 10]
  ]
  const course4 = new THREE.CatmullRomCurve3(
    controlPoints4.map((p) => new THREE.Vector3().set(p[0], p[1], p[2])),
    false
  );
  const controlPoints5 = [
    [25, 1, -57],
    [4.7, 1, 2],
    [-23, 1, 80]
  ]
  const course5 = new THREE.CatmullRomCurve3(
    controlPoints5.map((p) => new THREE.Vector3().set(p[0], p[1], p[2])),
    false
  );
  const controlPoints6 = [
    [60, 1, 14],
    [30, 1, 12],
    [4, 1, 10],
    [10, 1, 0],
    [23, 1, 3],
    [30, 1, 9],
    [60, 1, 10]
  ]
  const course6 = new THREE.CatmullRomCurve3(
    controlPoints6.map((p) => new THREE.Vector3().set(p[0], p[1], p[2])),
    false
  );
  const f = new THREE.Mesh(
    new THREE.BoxGeometry(1, 13, 1),
    new THREE.MeshBasicMaterial({ color: 0x000000 })
  )
  f.position.set(30, 1, 9);
  //scene.add(f);
  function drawRoad(course, color, width, visible) {
    const points = course.getPoints(1000);
    points.forEach((point) => {
      const road = new THREE.Mesh(
        new THREE.CircleGeometry(width, 16),
        new THREE.MeshLambertMaterial({ color })
      );
      road.rotateX(-Math.PI / 2);
      road.position.set(point.x, point.y, point.z);
      road.visible = visible;
      scene.add(road);
    });
  }

  drawRoad(course1, "gray", 3, false);
  drawRoad(course3, '0x0000000', 1, false)
  drawRoad(course4, "gray", 4, true);
  drawRoad(course5, "gray", 5, true);
  drawRoad(course6, '0x0000000', 1, false)

  //人オブジェクト
  function creatapeople() { //人模型を作るメソッド
    const people = new THREE.Group();
    const peoplematelal = new THREE.MeshLambertMaterial({ color: 0xf0f8ff })
    const head = new THREE.Mesh(
      new THREE.SphereGeometry(1.2, 16, 16), peoplematelal
    );
    head.position.set(0, 5, 0);
    people.add(head);  //頭
    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.2, 3, 16), peoplematelal
    )
    body.position.set(0, 3, 0);
    people.add(body);  //体
    const leftleggroup = new THREE.Group();
    const leftleg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.2, 3, 16), peoplematelal
    )
    leftleg.position.set(0. - 1, 0);
    leftleggroup.add(leftleg);
    leftleggroup.position.set(0.4, 0.5, 0)
    leftleggroup.rotation.z = -Math.PI / 20;
    people.add(leftleggroup);  //支点をずらして回転させる左足
    const rightleg = leftleggroup.clone();
    rightleg.position.set(1.5, 0.75, 0)
    rightleg.rotation.z = Math.PI / 20
    people.add(rightleg);  //左足のクローン
    const leftarmgroup = new THREE.Group();
    const leftarm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.2, 3, 16), peoplematelal
    )
    leftarm.position.set(0, -1, 0);
    leftarmgroup.add(leftarm);
    leftarmgroup.position.set(-0.2, 4, 0)
    leftarmgroup.rotation.z = -Math.PI / 10
    people.add(leftarmgroup);  //支点をずらして回転させる左手

    const rightarm = leftarmgroup.clone();
    rightarm.position.set(0.2, 4, 0);
    rightarm.rotation.z = Math.PI / 10
    people.add(rightarm)  //左手のクローン

    const front = new THREE.Mesh(
      new THREE.BoxGeometry(0.001, 0.001, 0.001), peoplematelal
    )
    front.position.set(0, 5, 1)
    front.visible = false;
    people.add(front);  //正面の設定(不可視)


    return { people, head, body, leftarm, leftleg, rightarm, rightleg, front };
  }
  //バス
  const bus = new THREE.Group();
  const center = new THREE.Mesh(
    new THREE.BoxGeometry(3.6, 5, 7),
    new THREE.MeshLambertMaterial({ color: 0xffffff })
  )
  center.position.y = 5;
  bus.add(center);
  const tyre1 = new THREE.Mesh(
    new THREE.CylinderGeometry(1, 1, 0.5),
    new THREE.MeshLambertMaterial({ color: 0x000000 })
  )
  tyre1.rotation.x = Math.PI / 2
  tyre1.position.set(1.5, 2.5, -2.25);
  bus.add(tyre1)
  const tyre2 = tyre1.clone();
  tyre2.position.z = 2.25
  bus.add(tyre2)
  const tyre3 = tyre1.clone();
  tyre3.position.x = -1.5;
  bus.add(tyre3)
  const tyre4 = tyre1.clone();
  tyre4.position.set(-1.5, 2.5, 2.25)
  bus.add(tyre4);
  bus.position.x = 5
  bus.rotation.y = Math.PI / 2;
  scene.add(bus);
  //アニメーション
  const courses = [course1, course3]; //人が動くコースを登録

  function makehuman(numpeople, courses) {
    const peoplegroup = [];
    const assignments = [];

    for (let i = 0; i < numpeople; i++) {
      const { people: human, head, body, leftarm, leftleg, rightarm, rightleg, front } = creatapeople();  //人模型をグループごと登録
      human.position.set(
        Math.random() * 50 - 25,
        1,
        Math.random() * 50 - 25
      );  //初期位置をランダムに選択


      const assignedcourse = courses[Math.floor(Math.random() * courses.length)];  //コースを選択
      assignments.push({ human, course: assignedcourse });  //どこに行ったか登録


      scene.add(human);
      peoplegroup.push(human);  //人の部品を登録
    }

    return { peoplegroup, assignments };
  }




  const { peoplegroup, assignments } = makehuman(10, courses);  //作る人数,コース

  const clock = new THREE.Clock();
  const position = new THREE.Vector3();
  const target = new THREE.Vector3();
  const busposition = new THREE.Vector3();
  const bustarget = new THREE.Vector3();
  function animetionhuman(assignments) {
    function animate() {
      const time = clock.getElapsedTime();
      requestAnimationFrame(animate);
      assignments.forEach(({ human, course }, index) => {
        const speed = (time / 30 + index * 0.1) % 1; //行ったコースによって移動速度の変更
        course.getPointAt(speed, position);
        human.position.copy(position);
        course.getPointAt((speed + 0.001) % 1, target); //向きを正す
        target.y = human.position.y;  //階段とかで体が斜めになるのを防止
        human.lookAt(target)

        human.children[2].rotation.x = Math.sin(time * 4) * 0.5;  //左手が動いているように見せる 
        human.children[3].rotation.x = -Math.sin(time * 4) * 0.5;  //左足が動いているように・・・
        human.children[4].rotation.x = -Math.sin(time * 4) * 0.5;  //右手・・・
        human.children[5].rotation.x = Math.sin(time * 4) * 0.5;  //右足・・・
      });
      course6.getPointAt((time / 30) % 1, busposition);
      bus.position.copy(busposition);
      course6.getPointAt((time / 30 + 0.001) % 1, bustarget);
      bus.lookAt(bustarget);


    }

    animate();
  }
  function embedcamera(assignments) {
    const { human } = assignments[0];  //assignmentからhumanをもらう
    const head = human.children[1];
    head.add(camera1);  //camera1を頭の子要素にする
    const front = human.children[6];
    const worldposition = front.getWorldPosition(new THREE.Vector3());  //ワールド座標を獲得
    camera1.position.set(0, 2, -1.1)  //camera1を頭に埋め込む
    human.visible = false;  //カメラのはじにに映る残骸を消す
    camera1.lookAt(worldposition);  //カメラの焦点を正面にする
  }
  animetionhuman(assignments);

  scene.add(map1);
  // 描画関数
  function render() {
    // 座標軸の表示
    axes.visible = param.axes;
    ///カメラ設定
    if (!param.follew) {
      camera.position.set(0, 200, 0);
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);  //俯瞰視点
    } else {
      embedcamera(assignments);
      renderer.render(scene, camera1);  //人目線
    }
    // 次のフレームでの描画要請
    requestAnimationFrame(render);
  }

  // 描画開始
  render();
}

init();
