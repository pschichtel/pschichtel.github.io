

(function() {

    const mat4 = {
        identity: [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ],

        orthographicProjectionFull: function(left, right, top, bottom, near, far) {
            return [
                2/(right - left), 0, 0, 0,
                0, 2/(top - bottom), 0, 0,
                0, 0, 2/(far - near), 0,
                -((right + left)/(right - left)), -((top + bottom)/(top - bottom)), -((far + near)/(far - near)), 1
            ]
        },

        orthographicProjection: function(width, height, depth) {
            return [
                2 / width , 0, 0, 0,
                0, 2 / height, 0, 0,
                0, 0, 2 / depth , 0,
                0, 0, 0         , 1,
            ];
        },

        transpose: function(a) {
            return [
                a[0], a[4], a[ 8], a[12],
                a[1], a[5], a[ 9], a[13],
                a[2], a[6], a[10], a[14],
                a[3], a[7], a[11], a[15],
            ]
        },

        invert: function(a) {
            const b = new Array(16);
            b[ 0] =  a[5] * a[10] * a[15] - a[5] * a[14] * a[11] - a[6] * a[9] * a[15] + a[6] * a[13] * a[11] + a[7] * a[9] * a[14] - a[7] * a[13] * a[10];
            b[ 1] = -a[1] * a[10] * a[15] + a[1] * a[14] * a[11] + a[2] * a[9] * a[15] - a[2] * a[13] * a[11] - a[3] * a[9] * a[14] + a[3] * a[13] * a[10];
            b[ 2] =  a[1] * a[ 6] * a[15] - a[1] * a[14] * a[ 7] - a[2] * a[5] * a[15] + a[2] * a[13] * a[ 7] + a[3] * a[5] * a[14] - a[3] * a[13] * a[ 6];
            b[ 3] = -a[1] * a[ 6] * a[11] + a[1] * a[10] * a[ 7] + a[2] * a[5] * a[11] - a[2] * a[ 9] * a[ 7] - a[3] * a[5] * a[10] + a[3] * a[ 9] * a[ 6];

            b[ 4] = -a[4] * a[10] * a[15] + a[4] * a[14] * a[11] + a[6] * a[8] * a[15] - a[6] * a[12] * a[11] - a[7] * a[8] * a[14] + a[7] * a[12] * a[10];
            b[ 5] =  a[0] * a[10] * a[15] - a[0] * a[14] * a[11] - a[2] * a[8] * a[15] + a[2] * a[12] * a[11] + a[3] * a[8] * a[14] - a[3] * a[12] * a[10];
            b[ 6] = -a[0] * a[ 6] * a[15] + a[0] * a[14] * a[ 7] + a[2] * a[4] * a[15] - a[2] * a[12] * a[ 7] - a[3] * a[4] * a[14] + a[3] * a[12] * a[ 6];
            b[ 7] =  a[0] * a[ 6] * a[11] - a[0] * a[10] * a[ 7] - a[2] * a[4] * a[11] + a[2] * a[ 8] * a[ 7] + a[3] * a[4] * a[10] - a[3] * a[ 8] * a[ 6];

            b[ 8] =  a[4] * a[9] * a[15] - a[4] * a[13] * a[11] - a[5] * a[8] * a[15] + a[5] * a[12] * a[11] + a[7] * a[8] * a[13] - a[7] * a[12] * a[9];
            b[ 9] = -a[0] * a[9] * a[15] + a[0] * a[13] * a[11] + a[1] * a[8] * a[15] - a[1] * a[12] * a[11] - a[3] * a[8] * a[13] + a[3] * a[12] * a[9];
            b[10] =  a[0] * a[5] * a[15] - a[0] * a[13] * a[ 7] - a[1] * a[4] * a[15] + a[1] * a[12] * a[ 7] + a[3] * a[4] * a[13] - a[3] * a[12] * a[5];
            b[11] = -a[0] * a[5] * a[11] + a[0] * a[ 9] * a[ 7] + a[1] * a[4] * a[11] - a[1] * a[ 8] * a[ 7] - a[3] * a[4] * a[ 9] + a[3] * a[ 8] * a[5];

            b[12] = -a[4] * a[9] * a[14] + a[4] * a[13] * a[10] + a[5] * a[8] * a[14] - a[5] * a[12] * a[10] - a[6] * a[8] * a[13] + a[6] * a[12] * a[9];
            b[13] =  a[0] * a[9] * a[14] - a[0] * a[13] * a[10] - a[1] * a[8] * a[14] + a[1] * a[12] * a[10] + a[2] * a[8] * a[13] - a[2] * a[12] * a[9];
            b[14] = -a[0] * a[5] * a[14] + a[0] * a[13] * a[ 6] + a[1] * a[4] * a[14] - a[1] * a[12] * a[ 6] - a[2] * a[4] * a[13] + a[2] * a[12] * a[5];
            b[15] =  a[0] * a[5] * a[10] - a[0] * a[ 9] * a[ 6] - a[1] * a[4] * a[10] + a[1] * a[ 8] * a[ 6] + a[2] * a[4] * a[ 9] - a[2] * a[ 8] * a[5];

            const det = a[0] * b[0] + a[1] * b[4] + a[2] * b[8] + a[3] * b[12];
            for (let i = 0; i < b.length; i++) {
                b[i] /= det;
            }

            return b;
        },

        multiply: function(a, b) {
            return [
                a[ 0] * b[0] + a[ 1] * b[4] + a[ 2] * b[8] + a[ 3] * b[12], a[ 0] * b[1] + a[ 1] * b[5] + a[ 2] * b[9] + a[ 3] * b[13], a[ 0] * b[2] + a[ 1] * b[6] + a[ 2] * b[10] + a[ 3] * b[14], a[ 0] * b[3] + a[ 1] * b[7] + a[ 2] * b[11] + a[ 3] * b[15],
                a[ 4] * b[0] + a[ 5] * b[4] + a[ 6] * b[8] + a[ 7] * b[12], a[ 4] * b[1] + a[ 5] * b[5] + a[ 6] * b[9] + a[ 7] * b[13], a[ 4] * b[2] + a[ 5] * b[6] + a[ 6] * b[10] + a[ 7] * b[14], a[ 4] * b[3] + a[ 5] * b[7] + a[ 6] * b[11] + a[ 7] * b[15],
                a[ 8] * b[0] + a[ 9] * b[4] + a[10] * b[8] + a[11] * b[12], a[ 8] * b[1] + a[ 9] * b[5] + a[10] * b[9] + a[11] * b[13], a[ 8] * b[2] + a[ 9] * b[6] + a[10] * b[10] + a[11] * b[14], a[ 8] * b[3] + a[ 9] * b[7] + a[10] * b[11] + a[11] * b[15],
                a[12] * b[0] + a[13] * b[4] + a[14] * b[8] + a[15] * b[12], a[12] * b[1] + a[13] * b[5] + a[14] * b[9] + a[15] * b[13], a[12] * b[2] + a[13] * b[6] + a[14] * b[10] + a[15] * b[14], a[12] * b[3] + a[13] * b[7] + a[14] * b[11] + a[15] * b[15],
            ];
        },

        multiplyV4: function(m, v) {
            return [
                m[ 0] * v[0] + m[ 1] * v[1] + m[ 2] * v[2] + m[ 3] * v[3],
                m[ 4] * v[0] + m[ 5] * v[1] + m[ 6] * v[2] + m[ 7] * v[3],
                m[ 8] * v[0] + m[ 9] * v[1] + m[10] * v[2] + m[11] * v[3],
                m[12] * v[0] + m[13] * v[1] + m[14] * v[2] + m[15] * v[3],
            ];
        },

        translation: function(x, y, z) {
            return [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                x, y, z, 1,
            ];
        },

        scale: function(x, y, z) {
            return [
                x, 0, 0, 0,
                0, y, 0, 0,
                0, 0, z, 0,
                0, 0, 0, 1,
            ];
        },

        rotation: function(w, x, y, z) {

            let a = [
                w, z, -y, x,
                -z, w, x, y,
                y, -x, w, z,
                -x, y, -z, w
            ];

            let b = [
                w, z, -y, -x,
                -z, w, x, -y,
                y, -x, w, -z,
                x, y, z, w
            ];

            return mat4.multiply(a, b);

        }

    };

    const vec = {
        squaredLength(x, y, z) {
            if (Array.isArray(x)) {
                [x, y, z] = x;
            }
            return x * x + y * y * z * z;
        },
        length: function(x, y, z) {
            if (Array.isArray(x)) {
                [x, y, z] = x;
            }
            return Math.sqrt(vec.squaredLength(x, y, z));
        },
        normalize: function(x, y, z) {
            if (Array.isArray(x)) {
                [x, y, z] = x;
            }
            const len = vec.length(x, y, z);
            return [x / len, y / len, z / len];
        },
        normalizeInPlace: function(v) {
            const len = vec.length(v[0], v[1], v[2]);
            v[0] /= len;
            v[1] /= len;
            v[2] /= len;
        },

        scale(s, x, y, z) {
            if (Array.isArray(x)) {
                [x, y, z] = x;
            }
            return [x * s, y * s, z * s];
        },

        scaleInPlace(v, s) {
            v[0] *= s;
            v[1] *= s;
            v[2] *= s;
        },

        dot(a, b) {
            return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
        },

        add(a, b) {
            return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
        },

        addInPlace(a, b) {
            a[0] += b[0];
            a[1] += b[1];
            a[2] += b[2];
        },

        set(v, x, y = x, z = x) {
            if (Array.isArray(x)) {
                [x, y, z] = x;
            }
            v[0] = x;
            v[1] = y;
            v[2] = z;
        }
    };

    const color = {
        red:   [1, 0, 0, 1],
        green: [0, 1, 0, 1],
        blue:  [0, 0, 1, 1],
        magenta:  [1, 0, 1, 1],

        hsv2rgb: function(hue, saturation, value, alpha = 1) {
            if (Array.isArray(hue)) {
                [hue, saturation, value, alpha] = hue;
            }
            const chroma = value * saturation;
            const hueSection = hue / 60;
            const x = chroma * (1 - Math.abs((hueSection % 2) - 1));
            const m = value - chroma;

            let r = 0;
            let g = 0;
            let b = 0;

            if (0 <= hueSection && hueSection <= 1) {
                r = chroma;
                g = x;
            } else if (1 <= hueSection && hueSection <= 2) {
                r = x;
                g = chroma;
            } else if (2 <= hueSection && hueSection <= 3) {
                g = chroma;
                b = x;
            } else if (3 <= hueSection && hueSection <= 4) {
                g = x;
                b = chroma;
            } else if (4 <= hueSection && hueSection <= 5) {
                r = x;
                b = chroma;
            } else if (5 <= hueSection && hueSection <= 6) {
                r = chroma;
                b = x;
            }

            return [r + m, g + m, b + m, alpha];
        },

        rgb2hsv: function(red, green, blue, alpha = 1) {
            if (Array.isArray(red)) {
                [red, green, blue, alpha] = red;
            }
            const max = Math.max(red, Math.min(green, blue));
            const min = Math.min(red, Math.min(green, blue));

            const delta = max - min;

            let hue = 0;
            let saturation = 0;
            const value = max;

            if (min === max) {
                hue = 0;
            } else if (max === red) {
                hue = 60 * (((green - blue) % 6) / delta);
            } else if (max === green) {
                hue = 60 * ((blue - red) / delta + 2);
            } else if (max === blue) {
                hue = 60 * ((red - green) / delta + 4);
            } else {
                throw "Hue calculation failed!"
            }

            if (max > 0) {
                saturation = delta / max;
            }

            if (hue < 0) {
                hue += 360;
            }

            return [hue, saturation, value, alpha]
        },

        temperature2rgb: function(kelvin, alpha = 1) {
            function clamp( x, min, max ) {
                if(x<min){ return min; }
                if(x>max){ return max; }
                return x;
            }

            let temp = kelvin / 100;
            let red, green, blue;

            if( temp <= 66 ){

                red = 255;

                green = temp;
                green = 99.4708025861 * Math.log(green) - 161.1195681661;


                if( temp <= 19){

                    blue = 0;

                } else {

                    blue = temp-10;
                    blue = 138.5177312231 * Math.log(blue) - 305.0447927307;

                }

            } else {

                red = temp - 60;
                red = 329.698727446 * Math.pow(red, -0.1332047592);

                green = temp - 60;
                green = 288.1221695283 * Math.pow(green, -0.0755148492 );

                blue = 255;

            }

            return [clamp(red,   0, 255) / 255, clamp(green,   0, 255) / 255, clamp(blue,   0, 255) / 255, alpha];
        },

        withLightness(c, lightness) {
            let [h, s, v, a] = color.rgb2hsv(c);
            return color.hsv2rgb(h, s, lightness, a);
        }
    };

    const aabb = {
        findAABB: function(mesh, transform) {
            let minX = Infinity;
            let maxX = -Infinity;
            let minY = Infinity;
            let maxY = -Infinity;
            let minZ = Infinity;
            let maxZ = -Infinity;

            let transformation = mat4.transpose(transform.getTransformation());

            for (let i = 0; i < mesh.vertexCount; ++i) {
                let x = mesh.vertices[i];
                let y = 0;
                let z = 0;

                if (mesh.vertexSize > 1) {
                    y = mesh.vertices[i + 1];
                }

                if (mesh.vertexSize > 2) {
                    z = mesh.vertices[i + 2];
                }

                let [tx, ty, tz,] = mat4.multiplyV4(transformation, [x, y, z, 1]);
                if (tx < minX) {
                    minX = tx;
                }
                if (tx > maxX) {
                    maxX = tx;
                }
                if (ty < minY) {
                    minY = ty;
                }
                if (ty > maxY) {
                    maxY = ty;
                }
                if (tz < minZ) {
                    minZ = tz;
                }
                if (tz > maxZ) {
                    maxZ = tz;
                }
            }

            return [[minX, minY, minZ], [maxX - minX, maxY - minY, maxZ - minZ]]
        }
    };

    function compileShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.log('An error occurred compiling the shaders:', gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }

        return shader;
    }

    function buildShader(gl, vertex, fragment, attributes, uniforms) {
        const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertex);
        if (vertexShader === null) {
            return null;
        }
        const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragment);
        if (fragmentShader === null) {
            return null;
        }

        // Create the shader program

        const shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);

        // If creating the shader program failed, alert

        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            console.log('Unable to initialize the shader program:', gl.getProgramInfoLog(shaderProgram));
            return null;
        }

        let shader = {
            program: shaderProgram,
            attribute: {},
            uniform: {},
        };

        for (let attribute of attributes) {
            shader.attribute[attribute] = gl.getAttribLocation(shaderProgram, attribute);
        }

        for (let uniform of uniforms) {
            shader.uniform[uniform] = gl.getUniformLocation(shaderProgram, uniform);
        }

        return shader;
    }

    class Mesh {
        constructor(gl, vertexSize, vertices) {
            this.vertexSize = vertexSize;
            this.vertices = vertices;
            this.vertexCount = this.vertices.length / this.vertexSize;
            this.dataType = gl.FLOAT;

            this.buffer = gl.createBuffer();
            this.bind(gl);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        }

        bind(gl) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        }

        static createRect(gl, width, height = width) {
            return new Mesh(gl, 2, [
                0, 0,
                0,  height,
                width, height,

                0, 0,
                width, height,
                width, 0
            ]);
        }

        static createCenteredRect(gl, width, height = width) {
            const halfWidth = width / 2;
            const halfHeight = height / 2;

            return new Mesh(gl, 2, [
                -halfWidth,  -halfHeight,
                -halfWidth, halfHeight,
                halfWidth, halfHeight,

                -halfWidth,  -halfHeight,
                halfWidth, halfHeight,
                halfWidth, -halfHeight
            ]);
        }
    }

    class Transform {
        constructor() {
            this.setPosition(0, 0, 0);
            this.setScale(1, 1, 1);
            this.setAngleAxis(0, 0, 0, 1);

            this.dirty = true;
            this.transform = mat4.identity;
        }

        set(otherTransform) {
            this.setPosition(otherTransform.getPosition());
            this.setScale(otherTransform.getScale());
            this.setRotationQuaternion(otherTransform.getRotationQuaternion());
        }

        setPosition(x, y, z) {
            if (Array.isArray(x)) {
                [x, y, z] = x;
            }
            this.posX = x;
            this.posY = y;
            this.posZ = z;
            this.translation = mat4.translation(x, y, z);

            this.dirty = true;
        }

        getPosition() {
            return [this.posX, this.posY, this.posZ];
        }

        move(x, y, z = 0) {
            if (Array.isArray(x)) {
                [x, y, z] = x;
            }
            this.setPosition(this.posX + x, this.posY + y, this.posZ + z);
        }

        setScale(x, y = x, z = x) {
            if (Array.isArray(x)) {
                [x, y, z] = x;
            }
            this.scaleX = x;
            this.scaleY = y;
            this.scaleZ = z;
            this.scale = mat4.scale(x, y, z);

            this.dirty = true;
        }

        getScale() {
            return [this.scaleX, this.scaleY, this.scaleZ];
        }

        setRotationQuaternion(w, x, y, z) {
            if (Array.isArray(w)) {
                [w, x, y, z] = w;
            }
            this.rotW = w;
            this.rotX = x;
            this.rotY = y;
            this.rotZ = z;
            this.rotation = mat4.rotation(w, x, y, z);

            this.dirty = true;
        }

        getRotationQuaternion() {
            return [this.rotW, this.rotX, this.rotY, this.rotZ];
        }

        setAngleAxis(angle, x, y, z) {
            let halfAngle = angle / 2.0;
            let s = Math.sin(halfAngle);

            this.setRotationQuaternion(Math.cos(halfAngle), x * s, y * s, z * s);
        }

        getAngleAxis() {
            let angle = 2.0 * Math.acos(this.rotW);
            if (angle === 0) {
                return [0, 0, 1, 0];
            }
            let s = Math.sqrt(1.0 - this.rotW * this.rotW);
            let x = this.rotX / s;
            let y = this.rotY / s;
            let z = this.rotZ / s;

            return [angle, x, y, z];
        }

        setEulerAngles(roll, pitch, yaw) {
            if (Array.isArray(roll)) {
                [roll, pitch, yaw] = roll;
            }
            const cy = Math.cos(yaw * 0.5);
            const sy = Math.sin(yaw * 0.5);
            const cp = Math.cos(pitch * 0.5);
            const sp = Math.sin(pitch * 0.5);
            const cr = Math.cos(roll * 0.5);
            const sr = Math.sin(roll * 0.5);

            this.setRotationQuaternion(cy * cp * cr + sy * sp * sr, cy * cp * sr - sy * sp * cr, sy * cp * sr + cy * sp * cr, sy * cp * cr - cy * sp * sr)
        }

        getEulerAngles() {
            const sinr_cosp = 2.0 * (this.rotW * this.rotX + this.rotY * this.rotZ);
            const cosr_cosp = 1.0 - 2.0 * (this.rotX * this.rotX + this.rotY * this.rotY);
            const roll = Math.atan2(sinr_cosp, cosr_cosp);

            const sinp = +2.0 * (this.rotW * this.rotY - this.rotZ * this.rotX);
            let pitch = 0;
            if (Math.abs(sinp) >= 1) {
                pitch = Math.sign(sinp) * (Math.PI / 2); // use 90 degrees if out of range
            } else {
                pitch = Math.asin(sinp);
            }


            const siny_cosp = +2.0 * (this.rotW * this.rotZ + this.rotX * this.rotY);
            const cosy_cosp = +1.0 - 2.0 * (this.rotY * this.rotY + this.rotZ * this.rotZ);
            const yaw = Math.atan2(siny_cosp, cosy_cosp);

            return [roll, pitch, yaw];
        }

        getTransformation() {
            if (this.dirty) {
                this.transform = mat4.multiply(this.rotation, mat4.multiply(this.scale, this.translation));
                this.dirty = false;
            }
            return this.transform;
        }
    }

    class Simulation {
        constructor(canvas, gl, shader) {
            this.canvas = canvas;
            this.gl = gl;
            this.shader = shader;
            this.view = mat4.identity;

            this.tempParticles = [];
            this.aliveParticles = [];
            this.deadParticles = [];
            this.particlePoolSize = 5000;

            this.particlePointBuffer = gl.createBuffer();
            this.particleColorBuffer = gl.createBuffer();
            this.mouseX = 0;
            this.mouseY = 0;
            this.mouseReachable = false;
            this.particleSize = 10;
            this.updateCanvas();
        }

        setPoolSize(size) {
            this.particlePoolSize = size;
        }

        canSpawn() {
            return this.aliveParticles.length < this.particlePoolSize;
        }

        spawn() {
            if (!this.canSpawn()) {
                return null;
            }
            let particle;
            if (this.deadParticles.length > 0) {
                particle = this.deadParticles.shift();
            } else {
                particle = new Particle();
            }
            this.aliveParticles.push(particle);
            particle.spawn();
            return particle;
        }

        kill(particle) {
            particle.alive = false;
            this.deadParticles.push(particle);
        }

        updateCanvas() {
            this.canvas.width = this.canvas.clientWidth;
            this.canvas.height = this.canvas.clientHeight;
            this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);

            this.updateProjection();

            this.topLeftCorner = mat4.multiplyV4(this.reverseProjection, [-1, 1, 0, 1]);
            this.bottomRightCorner = mat4.multiplyV4(this.reverseProjection, [1, -1, 0, 1]);
        }

        updateProjection() {
            this.zoom = window.devicePixelRatio;
            this.projection = mat4.orthographicProjection(this.canvas.width, this.canvas.height, 10);
            this.reverseProjection = mat4.invert(mat4.multiply(this.view, this.projection));
        }

        update(dt) {
            if (this.canvas.width !== this.canvas.clientWidth || this.canvas.height !== this.canvas.clientHeight) {
                this.updateCanvas();
            }
            if (this.zoom !== window.devicePixelRatio) {
                this.updateProjection();
            }
            this.simulateParticles(dt);
        }

        getMouseInWorld() {
            return this.browserPositionToWorld(this.mouseX, this.mouseY);
        }

        clickedAt(e) {
            let [x, y,] = this.browserPositionToWorld(e.clientX, e.clientY);
            console.log("clicked at", x, ",", y);
            let male = e.button === 0;
            if (this.canSpawn()) {
                let particle = this.spawn();
                particle.x = x;
                particle.y = y;
                particle.randomize();
                particle.male = male;
            }
        }

        browserPositionToWorld(browserX, browserY) {
            const x = browserX / (this.canvas.width / 2) - 1;
            const y = (this.canvas.height - browserY) / (this.canvas.height / 2) - 1;
            return mat4.multiplyV4(this.reverseProjection, [x, y, 0, 1]);
        }

        simulateParticles(dt) {
            let [mouseX, mouseY, ] = this.getMouseInWorld();
            let particlesCloseToMouse = new Set();
            let qt = new QuadTree(this.topLeftCorner, this.bottomRightCorner, 10);
            for (let particle of this.aliveParticles) {
                qt.add(particle.x, particle.y, particle);
            }

            if (document.hasFocus() && this.mouseReachable) {
                let radius = 200;
                for (let p of qt.selectCircle(mouseX, mouseY, radius)) {
                    particlesCloseToMouse.add(p);
                }
            }

            this.tempParticles = [];
            for (let particle of this.aliveParticles) {
                if (!particle.alive) {
                    continue;
                }

                let visibleNeighborsWithDistance = [];
                qt.forEachInCircle(particle.x, particle.y, particle.sightRange, (p, distanceSqr) => {
                    if (p.alive) {
                        visibleNeighborsWithDistance.push([p, distanceSqr]);
                    }
                });

                visibleNeighborsWithDistance.sort((a, b) => a[1] - b[1]);

                for (let [otherParticle, distSqr] of visibleNeighborsWithDistance) {
                    if (distSqr <= particle.attackRange * particle.attackRange && otherParticle.strength < particle.strength) {
                        this.kill(otherParticle);
                    }
                }

                for (let [otherParticle, ] of visibleNeighborsWithDistance) {
                    if (otherParticle.alive && otherParticle.male !== particle.male && this.canSpawn()) {
                        let child = this.spawn();
                        Particle.crossover(particle, otherParticle, child);
                        child.x = particle.x + (otherParticle.x - particle.x);
                        child.y = particle.y + (otherParticle.y - particle.y);
                        break;
                    }
                }

                particle.decisionTimeout -= dt;
                if (particle.decisionTimeout <= 0) {
                    let angle = random(0, 2 * Math.PI);
                    let vx = Math.cos(angle);
                    let vy = Math.sin(angle);
                    particle.vx = vx * particle.speed;
                    particle.vy = vy * particle.speed;

                    particle.decisionTimeout = particle.decisionDuration * 1000;
                }

                this.moveParticle(particle, dt);

                if (particle.male) {
                    particle.color = color.blue;
                } else {
                    particle.color = color.magenta;
                }


                if (particle.alive) {
                    this.tempParticles.push(particle);
                }
            }
            this.aliveParticles = this.tempParticles;

        }

        moveParticle(particle, dt) {
            let newX = particle.x + particle.vx * dt;
            let newY = particle.y + particle.vy * dt;

            if (newX < this.topLeftCorner[0]) {
                newX = this.bottomRightCorner[0] - (this.topLeftCorner[0] - newX);
            } else if (newX >= this.bottomRightCorner[0]) {
                newX = this.topLeftCorner[0] + (newX - this.bottomRightCorner[0]);
            }

            if (newY > this.topLeftCorner[1]) {
                newY = this.bottomRightCorner[1] + (newY - this.topLeftCorner[1]);
            } else if (newY <= this.bottomRightCorner[1]) {
                newY = this.topLeftCorner[1] - (this.bottomRightCorner[1] - newY);
            }

            particle.x = newX;
            particle.y = newY;
        }

        render() {
            this.gl.clearColor(0, 0, 0, 0);
            this.gl.clearDepth(1.0);
            this.gl.enable(gl.DEPTH_TEST);
            this.gl.depthFunc(gl.LEQUAL);

            this.gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

            this.gl.useProgram(this.shader.program);

            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.particlePointBuffer);
            let vertexData = new Float32Array(this.aliveParticles.length * 2);
            for (let i = 0; i < this.aliveParticles.length; ++i) {
                let bufOffset = i * 2;
                vertexData[bufOffset]     = this.aliveParticles[i].x;
                vertexData[bufOffset + 1] = this.aliveParticles[i].y;
            }
            this.gl.bufferData(this.gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);
            this.gl.vertexAttribPointer(this.shader.attribute["vertexPosition"], 2, this.gl.FLOAT, false, 0, 0);
            this.gl.enableVertexAttribArray(this.shader.attribute["vertexPosition"]);

            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.particleColorBuffer);
            let colorData = new Float32Array(this.aliveParticles.length * 4);
            for (let i = 0; i < this.aliveParticles.length; ++i) {
                let bufOffset = i * 4;
                colorData[bufOffset]     = this.aliveParticles[i].color[0];
                colorData[bufOffset + 1] = this.aliveParticles[i].color[1];
                colorData[bufOffset + 2] = this.aliveParticles[i].color[2];
                colorData[bufOffset + 3] = this.aliveParticles[i].color[3];
            }
            this.gl.bufferData(this.gl.ARRAY_BUFFER, colorData, gl.STATIC_DRAW);
            this.gl.vertexAttribPointer(this.shader.attribute["color"], 4, this.gl.FLOAT, false, 0, 0);
            this.gl.enableVertexAttribArray(this.shader.attribute["color"]);

            this.gl.uniformMatrix4fv(this.shader.uniform["modelMatrix"], false, mat4.identity);
            this.gl.uniformMatrix4fv(this.shader.uniform["viewMatrix"], false, this.view);
            this.gl.uniformMatrix4fv(this.shader.uniform["projectionMatrix"], false, this.projection);
            this.gl.uniform1f(this.shader.uniform["size"], this.particleSize);

            this.gl.drawArrays(gl.POINTS, 0, this.aliveParticles.length);
        }
    }

    function randomBoolean() {
        return !Math.floor(Math.random() * 2);
    }

    function random(min, max) {
        return min + Math.random() * (max - min);
    }

    class Particle {
        constructor() {
            this.spawn();

            this.color = color.blue;
            this.speed = 1;
            this.male = true;
            this.strength = 1;
            this.sightRange = 30;
            this.attackRange = 20;
            this.decisionDuration = 0;
        }

        spawn() {
            this.x = 0;
            this.y = 0;
            this.vx = 0;
            this.vy = 0;
            this.alive = true;
            this.decisionTimeout = 0;
        }

        randomize() {
            this.color = color.hsv2rgb(Math.random() * 5 * 60, 1, 1, 1);
            this.speed = random(15, 400);
            this.male = randomBoolean();
            this.strength = random(4, 10);
            this.sightRange = random(20, 50);
            this.attackRange = random(10, 20);
            this.decisionDuration = random(1, 3);
        }

        static crossover(parentA, parentB, child) {
            let mom;
            let dad;
            if (parentB.male) {
                mom = parentA;
                dad = parentB;
            } else {
                mom = parentB;
                dad = parentA;
            }
            for (let prop in this) {
                if (this.hasOwnProperty(prop)) {
                    child[prop] = randomBoolean() ? mom[prop] : dad[prop];
                }
            }
        }
    }

    class QuadTree {
        constructor(topLeft, bottomRight, limit = 10, depth = 0) {
            if (this.depth > 20) {
                throw "tree too deep"
            }
            this.topLeft = topLeft;
            this.bottomRight = bottomRight;
            this.objects = [];
            this.limit = limit;
            this.depth = depth;
            this.hasChildren = false;

            this.topLeftQuad = null;
            this.topRightQuad = null;
            this.bottomLeftQuad = null;
            this.bottomRightQuad = null;
        }

        contains(x, y) {
            return QuadTree.rectContains(x, y, this.topLeft, this.bottomRight);
        }

        static rectContains(x, y, tl, br) {
            return x >= tl[0] && x < br[0] && y <= tl[1] && y > br[1];
        }

        rectOverlaps(l, r) {
            return QuadTree.rectsOverlap(this.topLeft, this.bottomRight, l, r)
        }

        static rectsOverlap(l1, r1, l2, r2) {
            if (l1[0] > r2[0] || l2[0] > r1[0]) {
                return false;
            }

            if (l1[1] < r2[1] || l2[1] < r1[1]) {
                return false;
            }

            return true;
        }

        forEachQuad(f) {
            if (!f(this.topLeftQuad)) {
                return;
            }
            if (!f(this.topRightQuad)) {
                return;
            }
            if (!f(this.bottomLeftQuad)) {
                return;
            }
            f(this.bottomRightQuad);
        }

        add(x, y, obj) {
            this.addNode({
                x: x,
                y: y,
                object: obj
            });
        }

        addNode(node) {
            if (this.hasChildren) {
                this.forEachQuad(quad => {
                    if (quad.contains(node.x, node.y)) {
                        quad.addNode(node);
                        return false;
                    }
                    return true;
                });
            } else {
                if (this.objects.length >= this.limit) {
                    let oldObjects = this.objects;
                    this.objects = [];
                    const [tl, tr, bl, br] = QuadTree.calculateInnerPoints(this.topLeft, this.bottomRight);
                    this.topLeftQuad     = new QuadTree(tl[0], tl[1], this.limit, this.depth + 1);
                    this.topRightQuad    = new QuadTree(tr[0], tr[1], this.limit, this.depth + 1);
                    this.bottomLeftQuad  = new QuadTree(bl[0], bl[1], this.limit, this.depth + 1);
                    this.bottomRightQuad = new QuadTree(br[0], br[1], this.limit, this.depth + 1);
                    this.hasChildren = true;

                    for (let oldObject of oldObjects) {
                        this.addNode(oldObject)
                    }
                    this.addNode(node);
                } else {
                    this.objects.push(node);
                }
            }
        }

        static calculateInnerPoints(tl, br) {
            let midX = (tl[0] + (br[0] - tl[0]) / 2);
            let midY = (tl[1] - (tl[1] - br[1]) / 2);

            let topCenter = [midX, tl[1]];
            let leftCenter = [tl[0], midY];
            let middleCenter = [midX, midY];
            let rightCenter = [br[0], midY];
            let bottomCenter = [midX, br[1]];

            return [
                [tl, middleCenter],
                [topCenter, rightCenter],
                [leftCenter, bottomCenter],
                [middleCenter, br]
            ]
        }

        selectRect(tl, br) {
            let out = [];
            this.forEachInRect(tl, br, node => {
                out.push(node.object);
            });
            return out;
        }

        forEachInRect(tl, br, f) {
            if (this.hasChildren) {
                this.forEachQuad(q => {
                    if (q.rectOverlaps(tl, br)) {
                        q.forEachInRect(tl, br, f);
                    }
                    return true;
                });
            } else {
                for (let node of this.objects) {
                    if (QuadTree.rectContains(node.x, node.y, tl, br)) {
                        f(node);
                    }
                }
            }
        }

        selectCircle(centerX, centerY, radius) {
            const rl = [centerX - radius, centerY + radius];
            const br = [centerX + radius, centerY - radius];

            const radiusSqr = radius * radius;
            const out = [];
            this.forEachInCircle(rl, br, candidate => {
                let dx = candidate.x - centerX;
                let dy = candidate.y - centerY;
                if ((dx * dx + dy * dy) <= radiusSqr) {
                    out.push(candidate.object)
                }
            });
            return out;
        }

        forEachInCircle(centerX, centerY, radius, f) {
            const rl = [centerX - radius, centerY + radius];
            const br = [centerX + radius, centerY - radius];

            const radiusSqr = radius * radius;
            const out = [];
            this.forEachInRect(rl, br, candidate => {
                let dx = candidate.x - centerX;
                let dy = candidate.y - centerY;
                let distanceSqr = dx * dx + dy * dy;
                if (distanceSqr <= radiusSqr) {
                    f(candidate.object, distanceSqr);
                }
            });
            return out;
        }
    }

    function renderLoop(pt, f) {
        window.requestAnimationFrame(t => {
            let dt = 0;
            if (pt !== 0) {
                dt = (t - pt) / 1000;
            }
            f(dt);
            renderLoop(t, f);
        });
    }

    let canvas = document.querySelector("canvas");
    let gl = canvas.getContext("webgl");


    const vertexShader = `
        attribute vec4 vertexPosition;
        attribute vec4 color;
        
        uniform mat4 modelMatrix;
        uniform mat4 viewMatrix;
        uniform mat4 projectionMatrix;
        uniform float size;
        
        varying vec4 pointColor;
        
        void main() {
            vec4 rounded = vec4(floor(vertexPosition.x + 0.5), floor(vertexPosition.y + 0.5), vertexPosition.z, vertexPosition.w);
            gl_Position = projectionMatrix * viewMatrix * modelMatrix * rounded;
            gl_PointSize = size;
            pointColor = color.rgba;
        }
    `;

    const fragmentShader = `
        varying mediump vec4 pointColor;
        
        void main() {
            gl_FragColor = pointColor;
        }
    `;

    function gaussianRand() {
        return (Math.random() + Math.random()) / 2;
    }

    let defaultShader = buildShader(gl, vertexShader, fragmentShader, ["vertexPosition", "color"], ["projectionMatrix", "viewMatrix", "modelMatrix", "size"]);

    let sim = new Simulation(canvas, gl, defaultShader);
    window.addEventListener('mousemove', e => {
        sim.mouseX = e.clientX - canvas.clientLeft;
        sim.mouseY = e.clientY - canvas.clientTop;
        sim.mouseReachable = true;
    });
    window.addEventListener('mouseout', () => {
        sim.mouseReachable = false;
    });
    window.addEventListener('click', e => {
        sim.clickedAt(e);
    });

    const halfWidth = (canvas.width / 2);
    const halfHeight = (canvas.height / 2);

    function randomizeAndPlace(particle) {
        particle.x = (gaussianRand() * 2 - 1) * halfWidth;
        particle.y = (gaussianRand() * 2 - 1) * halfHeight;
        particle.randomize();
    }

    function spawnABunch(counter, sim, bunchSize, delay, onFinish) {
        for (let i = 0; i < bunchSize && sim.aliveParticles.length < sim.particlePoolSize; ++i) {
            randomizeAndPlace(sim.spawn());
        }
        if (sim.aliveParticles.length < sim.particlePoolSize) {
            setTimeout(() => spawnABunch(counter, sim, bunchSize, delay, onFinish), delay);
        } else {
            onFinish();
        }
    }

    spawnABunch(0, sim, 200, 50, () => {
        renderLoop(0, dt => {
            sim.update(dt);
            sim.render();
        });
        setTimeout(() => canvas.classList.add("loaded"), 1000);
    });



})();