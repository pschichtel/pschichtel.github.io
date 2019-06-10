

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
        hsv2rgb: function(hue, saturation, value) {
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

            return [r + m, g + m, b + m];
        },

        rgb2hsv: function(red, green, blue) {
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

            return [hue, saturation, value]
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
        constructor(canvas, gl, view) {
            this.canvas = canvas;
            this.gl = gl;
            this.view = view;
            this.gameObjects = [];
            this.updateCanvas();
        }

        addObject(obj) {
            this.gameObjects.push(obj);
        }

        updateCanvas() {
            this.canvas.width = this.canvas.clientWidth;
            this.canvas.height = this.canvas.clientHeight;
            this.projection = mat4.orthographicProjection(this.canvas.width, this.canvas.height, 10);
            this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
            this.reverseProjection = mat4.invert(mat4.multiply(this.view, this.projection));

            this.topLeftCorner = mat4.multiplyV4(this.reverseProjection, [-1, 1, 0, 1]);
            this.bottomRightCorner = mat4.multiplyV4(this.reverseProjection, [1, -1, 0, 1]);
        }

        update(dt) {
            if (this.canvas.width !== this.canvas.clientWidth || this.canvas.height !== this.canvas.clientHeight) {
                sim.updateCanvas()
            }
            this.simulatePhysics(dt);
            for (let go of this.gameObjects) {
                go.update(dt);
            }
        }

        simulatePhysics(dt) {
            for (let go of this.gameObjects) {
                go.transform.move(vec.scale(dt, go.velocity));
            }

            for (let go of this.gameObjects) {
                let [[x, y, ], [width, height, ]] = go.aabb;

                let leftDelta = x - this.topLeftCorner[0];
                let rightDelta = this.bottomRightCorner[0] - (x + width);

                let topDelta = this.topLeftCorner[1] - (y + height);
                let bottomDelta = y - this.bottomRightCorner[1];

                let applyForce = false;
                let out = [0, 0, 0];

                if (leftDelta < 0) {
                    out[0] = -leftDelta;
                    applyForce = true;
                } else if (rightDelta < 0) {
                    out[0] = rightDelta;
                    applyForce = true;
                }

                if (topDelta < 0) {
                    out[1] = topDelta;
                    applyForce = true;
                } else if (bottomDelta < 0) {
                    out[1] = -bottomDelta;
                    applyForce = true;
                }

                if (applyForce) {
                    console.log(out);
                    go.transform.move(out);
                    vec.set(go.velocity, 0);
                    // if (out[0] !== 0) {
                    //     go.velocity[0] = Math.abs(go.velocity[0]) * -Math.sign(out[0]);
                    // }
                    // if (out[1] !== 0) {
                    //     go.velocity[0] = Math.abs(go.velocity[1]) * -Math.sign(out[1]);
                    // }
                }
            }

        }

        render() {
            this.gl.clearColor(0, 0, 0, 0);
            this.gl.clearDepth(1.0);
            this.gl.enable(gl.DEPTH_TEST);
            this.gl.depthFunc(gl.LEQUAL);

            this.gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

            for (let go of this.gameObjects) {
                go.render(this.gl, this.projection, this.view);
            }
        }
    }

    class GameObject {
        constructor(mesh, shader) {
            this.transform = new Transform();
            this.mesh = mesh;
            this.shader = shader;

        }

        update(dt) {}
        render(gl, proj, view) {}

    }

    class Particle extends GameObject {
        constructor(mesh, shader, aabb) {
            super(mesh, shader);
            this.color = [1, 1, 1, 1];
            this.aabbObj = aabb;
            this.aabb = [];

            this.velocity = vec.scale(/*Math.random() * */200 + 20, vec.normalize(Math.random() * 2 - 1, Math.random() * 2 - 1, 0));;
            this.updateAabb();
        }

        updateAabb() {
            this.aabb = aabb.findAABB(this.mesh, this.transform);
            let [pos, scale] = this.aabb;
            this.aabbObj.transform.setPosition(pos);
            this.aabbObj.transform.setScale(scale);
        }

        update(dt) {
            let [r, g, b] = color.hsv2rgb(90, 1, 1);
            this.color = [r, g, b, 1];

            this.updateAabb();
        }

        render(gl, proj, view) {
            this.mesh.bind(gl);
            gl.vertexAttribPointer(this.shader.attribute["vertexPosition"], this.mesh.vertexSize, this.mesh.dataType, false, 0, 0);
            gl.enableVertexAttribArray(this.shader.attribute["vertexPosition"]);

            gl.useProgram(this.shader.program);
            gl.uniformMatrix4fv(this.shader.uniform["modelMatrix"], false, this.transform.getTransformation());
            gl.uniformMatrix4fv(this.shader.uniform["viewMatrix"], false, view);
            gl.uniformMatrix4fv(this.shader.uniform["projectionMatrix"], false, proj);
            gl.uniform4fv(this.shader.uniform["color"], this.color);

            gl.drawArrays(gl.TRIANGLES, 0, this.mesh.vertexCount);

            this.aabbObj.render(gl, proj, view);
        }
    }

    class AABB extends GameObject {

        constructor(mesh, shader) {
            super(mesh, shader)
        }

        update(dt) {}

        render(gl, proj, view) {
            this.mesh.bind(gl);
            gl.vertexAttribPointer(this.shader.attribute["vertexPosition"], this.mesh.vertexSize, this.mesh.dataType, false, 0, 0);
            gl.enableVertexAttribArray(this.shader.attribute["vertexPosition"]);

            gl.useProgram(this.shader.program);
            gl.uniformMatrix4fv(this.shader.uniform["modelMatrix"], false, this.transform.getTransformation());
            gl.uniformMatrix4fv(this.shader.uniform["viewMatrix"], false, mat4.identity);
            gl.uniformMatrix4fv(this.shader.uniform["projectionMatrix"], false, proj);
            gl.uniform4fv(this.shader.uniform["color"], [1, 0, 0, 1]);

            gl.drawArrays(gl.LINE_LOOP, 0, this.mesh.vertexCount);
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
        
        uniform mat4 modelMatrix;
        uniform mat4 viewMatrix;
        uniform mat4 projectionMatrix;
        
        void main() {
            gl_Position = projectionMatrix * viewMatrix * modelMatrix * vertexPosition;
        }
    `;

    const fragmentShader = `
        uniform mediump vec4 color;
        
        void main() {
            gl_FragColor = color;
        }
    `;

    let defaultShader = buildShader(gl, vertexShader, fragmentShader, ["vertexPosition"], ["projectionMatrix", "viewMatrix", "modelMatrix", "color"]);

    let sim = new Simulation(canvas, gl, mat4.identity);

    let unitSquare = Mesh.createRect(gl, 1);
    let squareMesh = Mesh.createCenteredRect(gl, 1);
    let particle = new Particle(squareMesh, defaultShader, new AABB(unitSquare, defaultShader));
    particle.transform.setScale(100);

    //sim.addObject(particle);

    renderLoop(0, dt => {
        sim.update(dt);
        sim.render();
    });
})();