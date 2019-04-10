import {Component, ElementRef, AfterViewInit, ViewChild, Input} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.scss']
})
export class CubeComponent implements AfterViewInit {

  constructor() {
    this.rotationSpeedX = 0.005;
    this.rotationSpeedY = 0.01;
    this.size = 200;
    this.texture = '/assets/textures/creates.gif';
    this.cameraZ = 400;
    this.fieldOfView = 70;
    this.nearClippingPane = 1;
    this.farClippingPane = 1000;
  }
  private camera: THREE.PerspectiveCamera;
  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }
  @ViewChild('canvas')
  private canvasRef: ElementRef;
  private cube: THREE.Mesh;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  @Input()
  public rotationSpeedX: number;
  @Input()
  public rotationSpeedY: number;
  @Input()
  public size: number;
  @Input()
  public texture: string;
  @Input()
  public cameraZ: number;
  @Input()
  public fieldOfView: number;
  @Input('nearClipping')
  public nearClippingPane: number;
  @Input('farClipping')
  public farClippingPane: number;
  private animateCube() {
    this.cube.rotation.x += this.rotationSpeedX;
    this.cube.rotation.y += this.rotationSpeedY;
  }
  private createScene() {
    this.scene = new THREE.Scene();
    const aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPane,
      this.farClippingPane
    );
    this.camera.position.z = this.cameraZ;
  }
  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }
  private startRenderingLoop() {
    // Use canvas element in template
    this.renderer = new THREE.WebGLRenderer({canvas: this.canvas});
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    const component: CubeComponent = this;
    (function render() {
      requestAnimationFrame(render);
      component.animateCube();
    }());
  }
  ngAfterViewInit() {
    this.createScene();
    this.startRenderingLoop();
  }

}
