import React from "react";
import Particles from "react-tsparticles";
import particlesConfig from "components/particlesconfig.js";

export default function ParticlesBackground() {
    return (
        <Particles params={particlesConfig}></Particles>
    )
}