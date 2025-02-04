import { Component, OnInit } from '@angular/core';
import { MoveDirection, OutMode, Engine, Container } from "@tsparticles/engine";
// import {TextParticle} from "@tsparticles/shape-text"
import { loadFull } from "tsparticles";
import { NgParticlesService } from "@tsparticles/angular";
@Component({
  selector: 'app-particlesbg',
  standalone: false,
  templateUrl: './particlesbg.component.html',
  styleUrls: ['./particlesbg.component.css']
})

export class ParticlesbgComponent implements OnInit {

  id = "tsparticles";
  particlesUrl = "http://localhost:3000/particlesconfig";


  constructor(private readonly ngParticlesService: NgParticlesService) {}

  ngOnInit(): void {
    this.ngParticlesService.init((engine: Engine) => {
      return loadFull(engine);
    });
  }

  async particlesInit(engine: Engine): Promise<void> {
    await loadFull(engine);
  }

  particlesLoaded(container: Container): void {
  }
}
