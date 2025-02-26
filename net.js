
const transformer = (() => {
const getTensorBuffer = (safetensorBuffer, tensorMetadata) => {
  return safetensorBuffer.subarray(...tensorMetadata.data_offsets);
};

const createEmptyBuf = (device, size) => {
    return device.createBuffer({size, usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST });
};

const createUniformBuf = (device, size) => {
  return device.createBuffer({size, usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST})
}

const createInfinityUniformBuf = (device) => {
  const size = 4;
  const buf = device.createBuffer({
    mappedAtCreation: true,
    size,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST
  });
  new Float32Array(buf.getMappedRange())[0] = Infinity;
  buf.unmap();
  return buf;
};

const createWeightBuf = (device, size, data) => {
  const buf = device.createBuffer({ size, usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST });
  data.bytes = buf;
  return buf;
};

const addComputePass = (device, commandEncoder, pipeline, layout, infinityUniformBuf, bufs, workgroup) => {
  const bindGroup = device.createBindGroup({
    layout: layout,
    entries: [
      { binding: 0, resource: { buffer: infinityUniformBuf } },
      ...bufs.map((buffer, index) => ({ binding: index + 1, resource: { buffer } }))
    ]
  });

  const passEncoder = commandEncoder.beginComputePass();
  passEncoder.setPipeline(pipeline);
  passEncoder.setBindGroup(0, bindGroup);
  passEncoder.dispatchWorkgroups(...workgroup);
  passEncoder.end();
};

const r_4_256_32_501_4_4 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
@group(0) @binding(1)var<storage,read_write>data0:array<f32>;
@group(0) @binding(2)var<storage,read_write>data1:array<i32>;
@group(0) @binding(3)var<storage,read_write>data2:array<i32>;
@group(0) @binding(4)var<storage,read_write>data3:array<atomic<u32>>;
@group(0) @binding(5)var<storage,read_write>data4:array<f32>;
@compute @workgroup_size(32) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 256 */
  var gidx1 = i32(gindex.y); /* 4 */
  var lidx0 = i32(lindex.x); /* 32 */
  var precast0 = gidx1;
  var cast0 = bitcast<u32>(precast0);
  var val0 = data2[0];
  var precast1 = (cast0<<9u);
  var acc0 = 0.0f;
  var acc1 = 0.0f;
  var acc2 = 0.0f;
  var acc3 = 0.0f;
  var acc4 = 0.0f;
  var acc5 = 0.0f;
  var acc6 = 0.0f;
  var acc7 = 0.0f;
  var acc8 = 0.0f;
  var acc9 = 0.0f;
  var acc10 = 0.0f;
  var acc11 = 0.0f;
  var acc12 = 0.0f;
  var acc13 = 0.0f;
  var acc14 = 0.0f;
  var acc15 = 0.0f;
  for (var ridx0 = 0; ridx0 < 501; ridx0++) {
    var precast2 = ridx0;
    var alu0 = ((gidx0*501)+ridx0);
    var val1 = data1[alu0];
    var val2 = data4[alu0];
    var precast3 = (bitcast<u32>(precast2)<<11u);
    var alu1 = (lidx0+(gidx0*1026048)+bitcast<i32>(precast1)+bitcast<i32>(precast3));
    var alu2 = (alu1+32);
    var alu3 = (alu1+64);
    var alu4 = (alu1+96);
    var alu5 = (alu1+128);
    var alu6 = (alu1+160);
    var alu7 = (alu1+192);
    var alu8 = (alu1+224);
    var alu9 = (alu1+256);
    var alu10 = (alu1+288);
    var alu11 = (alu1+320);
    var alu12 = (alu1+352);
    var alu13 = (alu1+384);
    var alu14 = (alu1+416);
    var alu15 = (alu1+448);
    var alu16 = (alu1+480);
    var val3 = atomicLoad(&data3[(alu1/4)]);
    var val4 = atomicLoad(&data3[(alu2/4)]);
    var val5 = atomicLoad(&data3[(alu3/4)]);
    var val6 = atomicLoad(&data3[(alu4/4)]);
    var val7 = atomicLoad(&data3[(alu5/4)]);
    var val8 = atomicLoad(&data3[(alu6/4)]);
    var val9 = atomicLoad(&data3[(alu7/4)]);
    var val10 = atomicLoad(&data3[(alu8/4)]);
    var val11 = atomicLoad(&data3[(alu9/4)]);
    var val12 = atomicLoad(&data3[(alu10/4)]);
    var val13 = atomicLoad(&data3[(alu11/4)]);
    var val14 = atomicLoad(&data3[(alu12/4)]);
    var val15 = atomicLoad(&data3[(alu13/4)]);
    var val16 = atomicLoad(&data3[(alu14/4)]);
    var val17 = atomicLoad(&data3[(alu15/4)]);
    var val18 = atomicLoad(&data3[(alu16/4)]);
    var cast1 = (f32(((val1!=val0)!=true)));
    var alu17 = ((val3>>(((u32(alu1))&3u)<<3u))&255u);
    var alu18 = ((val4>>(((u32(alu2))&3u)<<3u))&255u);
    var alu19 = ((val5>>(((u32(alu3))&3u)<<3u))&255u);
    var alu20 = ((val6>>(((u32(alu4))&3u)<<3u))&255u);
    var alu21 = ((val7>>(((u32(alu5))&3u)<<3u))&255u);
    var alu22 = ((val8>>(((u32(alu6))&3u)<<3u))&255u);
    var alu23 = ((val9>>(((u32(alu7))&3u)<<3u))&255u);
    var alu24 = ((val10>>(((u32(alu8))&3u)<<3u))&255u);
    var alu25 = ((val11>>(((u32(alu9))&3u)<<3u))&255u);
    var alu26 = ((val12>>(((u32(alu10))&3u)<<3u))&255u);
    var alu27 = ((val13>>(((u32(alu11))&3u)<<3u))&255u);
    var alu28 = ((val14>>(((u32(alu12))&3u)<<3u))&255u);
    var alu29 = ((val15>>(((u32(alu13))&3u)<<3u))&255u);
    var alu30 = ((val16>>(((u32(alu14))&3u)<<3u))&255u);
    var alu31 = ((val17>>(((u32(alu15))&3u)<<3u))&255u);
    var alu32 = ((val18>>(((u32(alu16))&3u)<<3u))&255u);
    var precast4 = (select(0u,4294967040u,(0u<(alu17>>7u)))|alu17);
    var precast5 = (select(0u,4294967040u,(0u<(alu18>>7u)))|alu18);
    var precast6 = (select(0u,4294967040u,(0u<(alu19>>7u)))|alu19);
    var precast7 = (select(0u,4294967040u,(0u<(alu20>>7u)))|alu20);
    var precast8 = (select(0u,4294967040u,(0u<(alu21>>7u)))|alu21);
    var precast9 = (select(0u,4294967040u,(0u<(alu22>>7u)))|alu22);
    var precast10 = (select(0u,4294967040u,(0u<(alu23>>7u)))|alu23);
    var precast11 = (select(0u,4294967040u,(0u<(alu24>>7u)))|alu24);
    var precast12 = (select(0u,4294967040u,(0u<(alu25>>7u)))|alu25);
    var precast13 = (select(0u,4294967040u,(0u<(alu26>>7u)))|alu26);
    var precast14 = (select(0u,4294967040u,(0u<(alu27>>7u)))|alu27);
    var precast15 = (select(0u,4294967040u,(0u<(alu28>>7u)))|alu28);
    var precast16 = (select(0u,4294967040u,(0u<(alu29>>7u)))|alu29);
    var precast17 = (select(0u,4294967040u,(0u<(alu30>>7u)))|alu30);
    var precast18 = (select(0u,4294967040u,(0u<(alu31>>7u)))|alu31);
    var precast19 = (select(0u,4294967040u,(0u<(alu32>>7u)))|alu32);
    acc0 = (acc0+(cast1*(f32((i32(bitcast<i32>(precast4)))))*val2));
    acc1 = (acc1+(cast1*(f32((i32(bitcast<i32>(precast8)))))*val2));
    acc2 = (acc2+(cast1*(f32((i32(bitcast<i32>(precast12)))))*val2));
    acc3 = (acc3+(cast1*(f32((i32(bitcast<i32>(precast16)))))*val2));
    acc4 = (acc4+(cast1*(f32((i32(bitcast<i32>(precast5)))))*val2));
    acc5 = (acc5+(cast1*(f32((i32(bitcast<i32>(precast9)))))*val2));
    acc6 = (acc6+(cast1*(f32((i32(bitcast<i32>(precast13)))))*val2));
    acc7 = (acc7+(cast1*(f32((i32(bitcast<i32>(precast17)))))*val2));
    acc8 = (acc8+(cast1*(f32((i32(bitcast<i32>(precast6)))))*val2));
    acc9 = (acc9+(cast1*(f32((i32(bitcast<i32>(precast10)))))*val2));
    acc10 = (acc10+(cast1*(f32((i32(bitcast<i32>(precast14)))))*val2));
    acc11 = (acc11+(cast1*(f32((i32(bitcast<i32>(precast18)))))*val2));
    acc12 = (acc12+(cast1*(f32((i32(bitcast<i32>(precast7)))))*val2));
    acc13 = (acc13+(cast1*(f32((i32(bitcast<i32>(precast11)))))*val2));
    acc14 = (acc14+(cast1*(f32((i32(bitcast<i32>(precast15)))))*val2));
    acc15 = (acc15+(cast1*(f32((i32(bitcast<i32>(precast19)))))*val2));
  }
  var precast20 = lidx0;
  var precast21 = (cast0<<17u);
  var precast22 = (bitcast<u32>(precast20)<<8u);
  var alu50 = (gidx0+bitcast<i32>(precast21)+bitcast<i32>(precast22));
  data0[alu50] = acc0;
  data0[(alu50+8192)] = acc4;
  data0[(alu50+16384)] = acc8;
  data0[(alu50+24576)] = acc12;
  data0[(alu50+32768)] = acc1;
  data0[(alu50+40960)] = acc5;
  data0[(alu50+49152)] = acc9;
  data0[(alu50+57344)] = acc13;
  data0[(alu50+65536)] = acc2;
  data0[(alu50+73728)] = acc6;
  data0[(alu50+81920)] = acc10;
  data0[(alu50+90112)] = acc14;
  data0[(alu50+98304)] = acc3;
  data0[(alu50+106496)] = acc7;
  data0[(alu50+114688)] = acc11;
  data0[(alu50+122880)] = acc15;
}`;

const r_1024_256_2 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
@group(0) @binding(1)var<storage,read_write>data0:array<f32>;
@group(0) @binding(2)var<storage,read_write>data1:array<f32>;
@compute @workgroup_size(1) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 1024 */
  var precast0 = gidx0;
  var cast0 = bitcast<u32>(precast0);
  var precast1 = (cast0<<9u);
  var acc0 = 0.0f;
  var acc1 = 0.0f;
  for (var ridx0 = 0; ridx0 < 256; ridx0++) {
    var alu0 = (bitcast<i32>(precast1)+ridx0);
    var val0 = data1[alu0];
    var val1 = data1[(alu0+256)];
    acc0 = (acc0+val0);
    acc1 = (acc1+val1);
  }
  var precast2 = (cast0<<1u);
  var cast1 = bitcast<i32>(precast2);
  data0[cast1] = acc0;
  data0[(cast1+1)] = acc1;
}`;

const r_16_128 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
var<workgroup> temp0: array<f32, 16>;
@group(0) @binding(1)var<storage,read_write>data0:array<f32>;
@group(0) @binding(2)var<storage,read_write>data1:array<f32>;
@compute @workgroup_size(16) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var lidx0 = i32(lindex.x); /* 16 */
  var precast0 = lidx0;
  var precast1 = (bitcast<u32>(precast0)<<7u);
  var acc0 = 0.0f;
  for (var ridx0 = 0; ridx0 < 128; ridx0++) {
    var val0 = data1[(bitcast<i32>(precast1)+ridx0)];
    acc0 = (acc0+(val0*val0));
  }
  temp0[lidx0] = acc0;
  workgroupBarrier();
  if (((bool(lidx0))!=true)) {
    var acc1 = 0.0f;
    for (var ridx1 = 0; ridx1 < 16; ridx1++) {
      var val1 = temp0[ridx1];
      acc1 = (acc1+val1);
    }
    data0[0] = (1/sqrt(((acc1*0.00048828125f)+1e-05f)));
  }
}`;

const E_1024_2 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
@group(0) @binding(1)var<storage,read_write>data0:array<f32>;
@group(0) @binding(2)var<storage,read_write>data1:array<f32>;
@group(0) @binding(3)var<storage,read_write>data2:array<f32>;
@group(0) @binding(4)var<storage,read_write>data3:array<f32>;
@compute @workgroup_size(1) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 1024 */
  var precast0 = gidx0;
  var val0 = data2[0];
  var precast1 = (bitcast<u32>(precast0)<<1u);
  var cast0 = bitcast<i32>(precast1);
  var val1 = data1[cast0];
  var val2 = data3[cast0];
  var alu0 = (cast0+1);
  var val3 = data1[alu0];
  var val4 = data3[alu0];
  data0[cast0] = (val1*val0*val2);
  data0[alu0] = (val3*val0*val4);
}`;

const r_512_256_8 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
var<workgroup> temp0: array<f32, 256>;
@group(0) @binding(1)var<storage,read_write>data0:array<f32>;
@group(0) @binding(2)var<storage,read_write>data1:array<f32>;
@group(0) @binding(3)var<storage,read_write>data2:array<atomic<u32>>;
@group(0) @binding(4)var<storage,read_write>data3:array<f32>;
@compute @workgroup_size(256) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 512 */
  var lidx0 = i32(lindex.x); /* 256 */
  var precast0 = lidx0;
  var precast1 = (bitcast<u32>(precast0)<<3u);
  var cast0 = bitcast<i32>(precast1);
  var val0 = data3[gidx0];
  var precast2 = gidx0;
  var precast3 = (bitcast<u32>(precast2)<<11u);
  var acc0 = 0.0f;
  for (var ridx0 = 0; ridx0 < 8; ridx0++) {
    var val1 = data1[(cast0+ridx0)];
    var alu0 = (bitcast<i32>(precast3)+cast0+ridx0);
    var val2 = atomicLoad(&data2[(alu0/4)]);
    var alu1 = ((val2>>(((u32(alu0))&3u)<<3u))&255u);
    var precast4 = (select(0u,4294967040u,(0u<(alu1>>7u)))|alu1);
    acc0 = (acc0+(val1*(f32((i32(bitcast<i32>(precast4)))))*val0));
  }
  temp0[lidx0] = acc0;
  workgroupBarrier();
  if (((bool(lidx0))!=true)) {
    var acc1 = 0.0f;
    for (var ridx1 = 0; ridx1 < 256; ridx1++) {
      var val3 = temp0[ridx1];
      acc1 = (acc1+val3);
    }
    data0[gidx0] = acc1;
  }
}`;

const E_2_64_8 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
@group(0) @binding(1)var<storage,read_write>data0:array<f32>;
@group(0) @binding(2)var<storage,read_write>data1:array<f32>;
@group(0) @binding(3)var<storage,read_write>data2:array<f32>;
@group(0) @binding(4)var<storage,read_write>data3:array<f32>;
@group(0) @binding(5)var<uniform>start_pos:i32;
@compute @workgroup_size(1) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 64 */
  var gidx1 = i32(gindex.y); /* 2 */
  var precast0 = start_pos;
  var cast0 = bitcast<u32>(precast0);
  var alu0 = (gidx1<1);
  var alu1 = (alu0!=true);
  var val0 = select(0.0f, data3[gidx0], alu1);
  var val1 = select(0.0f, data3[(gidx0+64)], alu1);
  var val2 = select(0.0f, data3[(gidx0+128)], alu1);
  var val3 = select(0.0f, data3[(gidx0+192)], alu1);
  var val4 = select(0.0f, data3[(gidx0+256)], alu1);
  var val5 = select(0.0f, data3[(gidx0+320)], alu1);
  var val6 = select(0.0f, data3[(gidx0+384)], alu1);
  var val7 = select(0.0f, data3[(gidx0+448)], alu1);
  var precast1 = (cast0<<6u);
  var precast2 = (gidx0>>1);
  var precast3 = (bitcast<u32>(precast2)<<1u);
  var cast1 = bitcast<i32>(precast3);
  var alu2 = (bitcast<i32>(precast1)+cast1);
  var alu3 = ((gidx0&1)<1);
  var alu4 = (alu0&alu3);
  var val8 = select(0.0f, data1[(cast1+1)], alu4);
  var val9 = select(0.0f, data1[(cast1+64)], alu4);
  var val10 = select(0.0f, data1[(cast1+65)], alu4);
  var val11 = select(0.0f, data1[(cast1+128)], alu4);
  var val12 = select(0.0f, data1[(cast1+129)], alu4);
  var val13 = select(0.0f, data1[(cast1+192)], alu4);
  var val14 = select(0.0f, data1[(cast1+193)], alu4);
  var val15 = select(0.0f, data1[(cast1+256)], alu4);
  var val16 = select(0.0f, data1[(cast1+384)], alu4);
  var val17 = select(0.0f, data1[(cast1+385)], alu4);
  var val18 = select(0.0f, data1[cast1], alu4);
  var val19 = select(0.0f, data1[(cast1+448)], alu4);
  var val20 = select(0.0f, data1[(cast1+449)], alu4);
  var val21 = select(0.0f, data2[alu2], alu4);
  var val22 = select(0.0f, data2[(alu2+1)], alu4);
  var val23 = select(0.0f, data1[(cast1+257)], alu4);
  var val24 = select(0.0f, data1[(cast1+320)], alu4);
  var val25 = select(0.0f, data1[(cast1+321)], alu4);
  var alu5 = (alu0&(alu3!=true));
  var val26 = select(0.0f, data1[(cast1+64)], alu5);
  var val27 = select(0.0f, data1[(cast1+65)], alu5);
  var val28 = select(0.0f, data1[(cast1+128)], alu5);
  var val29 = select(0.0f, data1[(cast1+1)], alu5);
  var val30 = select(0.0f, data1[(cast1+129)], alu5);
  var val31 = select(0.0f, data1[(cast1+192)], alu5);
  var val32 = select(0.0f, data1[(cast1+193)], alu5);
  var val33 = select(0.0f, data1[(cast1+256)], alu5);
  var val34 = select(0.0f, data1[(cast1+257)], alu5);
  var val35 = select(0.0f, data1[(cast1+320)], alu5);
  var val36 = select(0.0f, data1[(cast1+321)], alu5);
  var val37 = select(0.0f, data1[(cast1+384)], alu5);
  var val38 = select(0.0f, data1[(cast1+448)], alu5);
  var val39 = select(0.0f, data1[(cast1+449)], alu5);
  var val40 = select(0.0f, data2[(alu2+1)], alu5);
  var val41 = select(0.0f, data1[cast1], alu5);
  var val42 = select(0.0f, data1[(cast1+385)], alu5);
  var val43 = select(0.0f, data2[alu2], alu5);
  var precast4 = gidx1;
  var precast5 = (cast0<<9u);
  var precast6 = (bitcast<u32>(precast4)<<19u);
  var alu6 = (gidx0+bitcast<i32>(precast5)+bitcast<i32>(precast6));
  var alu7 = select(0.0f,select(0.0f,-1.0f,alu0),alu4);
  data0[alu6] = ((val18*val21)+(val8*val22*alu7)+(val41*val40)+(val29*val43)+val0);
  data0[(alu6+64)] = ((val9*val21)+(val10*val22*alu7)+(val26*val40)+(val27*val43)+val1);
  data0[(alu6+128)] = ((val11*val21)+(val12*val22*alu7)+(val28*val40)+(val30*val43)+val2);
  data0[(alu6+192)] = ((val13*val21)+(val14*val22*alu7)+(val31*val40)+(val32*val43)+val3);
  data0[(alu6+256)] = ((val15*val21)+(val23*val22*alu7)+(val33*val40)+(val34*val43)+val4);
  data0[(alu6+320)] = ((val24*val21)+(val25*val22*alu7)+(val35*val40)+(val36*val43)+val5);
  data0[(alu6+384)] = ((val16*val21)+(val17*val22*alu7)+(val37*val40)+(val42*val43)+val6);
  data0[(alu6+448)] = ((val19*val21)+(val20*val22*alu7)+(val38*val40)+(val39*val43)+val7);
}`;

const r_2048_16_32_4 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
var<workgroup> temp0: array<f32, 16>;
@group(0) @binding(1)var<storage,read_write>data0:array<f32>;
@group(0) @binding(2)var<storage,read_write>data1:array<f32>;
@group(0) @binding(3)var<storage,read_write>data2:array<atomic<u32>>;
@group(0) @binding(4)var<storage,read_write>data3:array<f32>;
@compute @workgroup_size(16) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 2048 */
  var lidx0 = i32(lindex.x); /* 16 */
  var val0 = data3[gidx0];
  var precast0 = gidx0;
  var precast1 = (bitcast<u32>(precast0)<<11u);
  var acc0 = 0.0f;
  for (var ridx0 = 0; ridx0 < 32; ridx0++) {
    var precast2 = ridx0;
    var precast3 = (bitcast<u32>(precast2)<<6u);
    var cast0 = bitcast<i32>(precast3);
    var alu0 = (lidx0+cast0);
    var val1 = data1[alu0];
    var alu1 = (lidx0+bitcast<i32>(precast1)+cast0);
    var val2 = data1[(alu0+16)];
    var val3 = data1[(alu0+32)];
    var val4 = data1[(alu0+48)];
    var alu2 = (alu1+16);
    var alu3 = (alu1+32);
    var alu4 = (alu1+48);
    var val5 = atomicLoad(&data2[(alu1/4)]);
    var val6 = atomicLoad(&data2[(alu2/4)]);
    var val7 = atomicLoad(&data2[(alu3/4)]);
    var val8 = atomicLoad(&data2[(alu4/4)]);
    var alu5 = ((val5>>(((u32(alu1))&3u)<<3u))&255u);
    var alu6 = ((val6>>(((u32(alu2))&3u)<<3u))&255u);
    var alu7 = ((val7>>(((u32(alu3))&3u)<<3u))&255u);
    var alu8 = ((val8>>(((u32(alu4))&3u)<<3u))&255u);
    var precast4 = (select(0u,4294967040u,(0u<(alu5>>7u)))|alu5);
    var precast5 = (select(0u,4294967040u,(0u<(alu6>>7u)))|alu6);
    var precast6 = (select(0u,4294967040u,(0u<(alu7>>7u)))|alu7);
    var precast7 = (select(0u,4294967040u,(0u<(alu8>>7u)))|alu8);
    acc0 = (acc0+(val1*(f32((i32(bitcast<i32>(precast4)))))*val0)+(val2*(f32((i32(bitcast<i32>(precast5)))))*val0)+(val3*(f32((i32(bitcast<i32>(precast6)))))*val0)+(val4*(f32((i32(bitcast<i32>(precast7)))))*val0));
  }
  temp0[lidx0] = acc0;
  workgroupBarrier();
  if (((bool(lidx0))!=true)) {
    var acc1 = 0.0f;
    for (var ridx1 = 0; ridx1 < 16; ridx1++) {
      var val9 = temp0[ridx1];
      acc1 = (acc1+val9);
    }
    data0[gidx0] = acc1;
  }
}`;

const E_32_32_2 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
@group(0) @binding(1)var<storage,read_write>data0:array<f32>;
@group(0) @binding(2)var<storage,read_write>data1:array<f32>;
@group(0) @binding(3)var<storage,read_write>data2:array<f32>;
@group(0) @binding(4)var<uniform>start_pos:i32;
@compute @workgroup_size(1) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 32 */
  var gidx1 = i32(gindex.y); /* 32 */
  var precast0 = start_pos;
  var precast1 = gidx0;
  var precast2 = gidx1;
  var precast3 = (bitcast<u32>(precast0)<<6u);
  var precast4 = (bitcast<u32>(precast1)<<1u);
  var cast0 = bitcast<i32>(precast4);
  var alu0 = (bitcast<i32>(precast3)+cast0);
  var val0 = data2[alu0];
  var val1 = data2[(alu0+1)];
  var precast5 = (bitcast<u32>(precast2)<<6u);
  var alu1 = (cast0+bitcast<i32>(precast5));
  var val2 = data1[alu1];
  var alu2 = (alu1+1);
  var val3 = data1[alu2];
  data0[alu2] = ((val2*val1)+(val3*val0));
  data0[alu1] = ((val2*val0)-(val3*val1));
}`;

const r_16_28start_pos2B129_64_2 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
var<workgroup> temp0: array<f32, 128>;
@group(0) @binding(1)var<storage,read_write>data0:array<f32>;
@group(0) @binding(2)var<storage,read_write>data1:array<f32>;
@group(0) @binding(3)var<storage,read_write>data2:array<f32>;
@group(0) @binding(4)var<uniform>start_pos:i32;
@compute @workgroup_size(64) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* UOp(Ops.ADD, dtypes.int, arg=None, src=(
  UOp(Ops.DEFINE_VAR, dtypes.int, arg=('start_pos', 0, 1024), src=()),
  UOp(Ops.CONST, dtypes.int, arg=1, src=()),)) */
  var gidx1 = i32(gindex.y); /* 16 */
  var lidx0 = i32(lindex.x); /* 64 */
  var precast0 = start_pos;
  var cast0 = bitcast<u32>(precast0);
  var precast1 = (cast0<<1u);
  var alu0 = (gidx0+(gidx1*(bitcast<i32>(precast1)+2)));
  var precast2 = gidx0;
  var precast3 = gidx1;
  var precast4 = (cast0<<3u);
  var precast5 = (bitcast<u32>(precast2)<<3u);
  var precast6 = (bitcast<u32>(precast3)<<7u);
  var alu1 = (lidx0+bitcast<i32>(precast6));
  var val0 = data1[alu1];
  var val1 = data1[(alu1+64)];
  var precast7 = ((bitcast<i32>(precast5)+(gidx1>>1))%(bitcast<i32>(precast4)+8));
  var precast8 = (bitcast<u32>(precast7)<<6u);
  var val2 = data2[(lidx0+bitcast<i32>(precast8))];
  var precast9 = lidx0;
  var precast10 = (bitcast<u32>(precast9)<<1u);
  var cast1 = bitcast<i32>(precast10);
  temp0[cast1] = (val0*val2);
  temp0[(cast1+1)] = (val1*val2);
  workgroupBarrier();
  if (((bool(lidx0))!=true)) {
    var acc0 = 0.0f;
    var acc1 = 0.0f;
    for (var ridx0 = 0; ridx0 < 64; ridx0++) {
      var precast11 = ridx0;
      var precast12 = (bitcast<u32>(precast11)<<1u);
      var cast2 = bitcast<i32>(precast12);
      var val3 = temp0[cast2];
      var val4 = temp0[(cast2+1)];
      acc0 = (acc0+val3);
      acc1 = (acc1+val4);
    }
    data0[alu0] = (acc0*0.125f);
    data0[(start_pos+alu0+1)] = (acc1*0.125f);
  }
}`;

const r_16_28start_pos2B129_2 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
@group(0) @binding(1)var<storage,read_write>data0:array<f32>;
@group(0) @binding(2)var<storage,read_write>data1:array<f32>;
@group(0) @binding(3)var<uniform>start_pos:i32;
@compute @workgroup_size(1) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 16 */
  var precast0 = start_pos;
  var precast1 = (bitcast<u32>(precast0)<<1u);
  var acc0 = (f32(-INFINITY));
  var acc1 = (f32(-INFINITY));
  for (var ridx0 = 0; ridx0 < (start_pos+1); ridx0++) {
    var alu0 = ((gidx0*(bitcast<i32>(precast1)+2))+ridx0);
    var val0 = data1[alu0];
    var val1 = data1[(start_pos+alu0+1)];
    acc0 = select(acc0,val0,(acc0<val0));
    acc1 = select(acc1,val1,(acc1<val1));
  }
  var precast2 = gidx0;
  var precast3 = (bitcast<u32>(precast2)<<1u);
  var cast0 = bitcast<i32>(precast3);
  data0[cast0] = acc0;
  data0[(cast0+1)] = acc1;
}`;

const r_16_2_28start_pos2B129 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
@group(0) @binding(1)var<storage,read_write>data0:array<f32>;
@group(0) @binding(2)var<storage,read_write>data1:array<f32>;
@group(0) @binding(3)var<storage,read_write>data2:array<f32>;
@group(0) @binding(4)var<uniform>start_pos:i32;
@compute @workgroup_size(2) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 16 */
  var lidx0 = i32(lindex.x); /* 2 */
  var precast0 = gidx0;
  var precast1 = (bitcast<u32>(precast0)<<1u);
  var alu0 = (lidx0+bitcast<i32>(precast1));
  var alu1 = (start_pos+1);
  var val0 = data2[alu0];
  var precast2 = start_pos;
  var precast3 = (bitcast<u32>(precast2)<<1u);
  var acc0 = 0.0f;
  for (var ridx0 = 0; ridx0 < alu1; ridx0++) {
    var val1 = data1[((gidx0*(bitcast<i32>(precast3)+2))+(lidx0*alu1)+ridx0)];
    acc0 = (acc0+exp2(((val1-val0)*1.4426950408889634f)));
  }
  data0[alu0] = acc0;
}`;

const E_8_28start_pos2B129_4n1 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
@group(0) @binding(1)var<storage,read_write>data0:array<f32>;
@group(0) @binding(2)var<storage,read_write>data1:array<f32>;
@group(0) @binding(3)var<storage,read_write>data2:array<f32>;
@group(0) @binding(4)var<storage,read_write>data3:array<f32>;
@group(0) @binding(5)var<uniform>start_pos:i32;
@compute @workgroup_size(4) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* UOp(Ops.ADD, dtypes.int, arg=None, src=(
  UOp(Ops.DEFINE_VAR, dtypes.int, arg=('start_pos', 0, 1024), src=()),
  UOp(Ops.CONST, dtypes.int, arg=1, src=()),)) */
  var gidx1 = i32(gindex.y); /* 8 */
  var lidx0 = i32(lindex.x); /* 4 */
  var precast0 = start_pos;
  var precast1 = gidx1;
  var precast2 = (bitcast<u32>(precast0)<<2u);
  var alu0 = (gidx0+(gidx1*(bitcast<i32>(precast2)+4))+(lidx0*(start_pos+1)));
  var val0 = data1[alu0];
  var precast3 = (bitcast<u32>(precast1)<<2u);
  var alu1 = (lidx0+bitcast<i32>(precast3));
  var val1 = data2[alu1];
  var val2 = data3[alu1];
  data0[alu0] = (exp2(((val0-val1)*1.4426950408889634f))*(1/val2));
}`;

const r_32_8_8_28start_pos2B129 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
@group(0) @binding(1)var<storage,read_write>data0:array<f32>;
@group(0) @binding(2)var<storage,read_write>data1:array<f32>;
@group(0) @binding(3)var<storage,read_write>data2:array<f32>;
@group(0) @binding(4)var<uniform>start_pos:i32;
@compute @workgroup_size(8) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 8 */
  var gidx1 = i32(gindex.y); /* 32 */
  var lidx0 = i32(lindex.x); /* 8 */
  var precast0 = gidx0;
  var precast1 = (bitcast<u32>(precast0)<<3u);
  var cast0 = bitcast<i32>(precast1);
  var alu0 = (start_pos+1);
  var precast2 = start_pos;
  var precast3 = (bitcast<u32>(precast2)<<3u);
  var acc0 = 0.0f;
  for (var ridx0 = 0; ridx0 < alu0; ridx0++) {
    var precast4 = ridx0;
    var val0 = data1[((gidx1*alu0)+ridx0)];
    var precast5 = (bitcast<u32>(precast4)<<3u);
    var precast6 = ((bitcast<i32>(precast5)+(gidx1>>2))%(bitcast<i32>(precast3)+8));
    var precast7 = (bitcast<u32>(precast6)<<6u);
    var val1 = data2[(lidx0+cast0+bitcast<i32>(precast7)+524288)];
    acc0 = (acc0+(val0*val1));
  }
  var precast8 = gidx1;
  var precast9 = (bitcast<u32>(precast8)<<6u);
  data0[(lidx0+cast0+bitcast<i32>(precast9))] = acc0;
}`;

const r_2048_16_32_4n1 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
var<workgroup> temp0: array<f32, 16>;
@group(0) @binding(1)var<storage,read_write>data0:array<f32>;
@group(0) @binding(2)var<storage,read_write>data1:array<f32>;
@group(0) @binding(3)var<storage,read_write>data2:array<f32>;
@group(0) @binding(4)var<storage,read_write>data3:array<atomic<u32>>;
@group(0) @binding(5)var<storage,read_write>data4:array<f32>;
@compute @workgroup_size(16) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 2048 */
  var lidx0 = i32(lindex.x); /* 16 */
  var val0 = data1[gidx0];
  var val1 = data4[gidx0];
  var precast0 = gidx0;
  var precast1 = (bitcast<u32>(precast0)<<11u);
  var acc0 = 0.0f;
  for (var ridx0 = 0; ridx0 < 32; ridx0++) {
    var precast2 = ridx0;
    var precast3 = (bitcast<u32>(precast2)<<6u);
    var cast0 = bitcast<i32>(precast3);
    var alu0 = (lidx0+cast0);
    var val2 = data2[alu0];
    var alu1 = (lidx0+bitcast<i32>(precast1)+cast0);
    var val3 = data2[(alu0+16)];
    var val4 = data2[(alu0+32)];
    var val5 = data2[(alu0+48)];
    var alu2 = (alu1+16);
    var alu3 = (alu1+32);
    var alu4 = (alu1+48);
    var val6 = atomicLoad(&data3[(alu1/4)]);
    var val7 = atomicLoad(&data3[(alu2/4)]);
    var val8 = atomicLoad(&data3[(alu3/4)]);
    var val9 = atomicLoad(&data3[(alu4/4)]);
    var alu5 = ((val6>>(((u32(alu1))&3u)<<3u))&255u);
    var alu6 = ((val7>>(((u32(alu2))&3u)<<3u))&255u);
    var alu7 = ((val8>>(((u32(alu3))&3u)<<3u))&255u);
    var alu8 = ((val9>>(((u32(alu4))&3u)<<3u))&255u);
    var precast4 = (select(0u,4294967040u,(0u<(alu5>>7u)))|alu5);
    var precast5 = (select(0u,4294967040u,(0u<(alu6>>7u)))|alu6);
    var precast6 = (select(0u,4294967040u,(0u<(alu7>>7u)))|alu7);
    var precast7 = (select(0u,4294967040u,(0u<(alu8>>7u)))|alu8);
    acc0 = (acc0+(val2*(f32((i32(bitcast<i32>(precast4)))))*val1)+(val3*(f32((i32(bitcast<i32>(precast5)))))*val1)+(val4*(f32((i32(bitcast<i32>(precast6)))))*val1)+(val5*(f32((i32(bitcast<i32>(precast7)))))*val1));
  }
  temp0[lidx0] = acc0;
  workgroupBarrier();
  if (((bool(lidx0))!=true)) {
    var acc1 = 0.0f;
    for (var ridx1 = 0; ridx1 < 16; ridx1++) {
      var val10 = temp0[ridx1];
      acc1 = (acc1+val10);
    }
    data0[gidx0] = (val0+acc1);
  }
}`;

const r_8192_16_32_4 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
var<workgroup> temp0: array<f32, 512>;
@group(0) @binding(1)var<storage,read_write>data0:array<f32>;
@group(0) @binding(2)var<storage,read_write>data1:array<f32>;
@group(0) @binding(3)var<storage,read_write>data2:array<atomic<u32>>;
@group(0) @binding(4)var<storage,read_write>data3:array<f32>;
@compute @workgroup_size(16,32) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 8192 */
  var lidx0 = i32(lindex.x); /* 16 */
  var lidx1 = i32(lindex.y); /* 32 */
  var val0 = data3[gidx0];
  var precast0 = gidx0;
  var precast1 = lidx1;
  var precast2 = (bitcast<u32>(precast0)<<11u);
  var precast3 = (bitcast<u32>(precast1)<<6u);
  var cast0 = bitcast<i32>(precast3);
  var acc0 = 0.0f;
  for (var ridx0 = 0; ridx0 < 4; ridx0++) {
    var precast4 = ridx0;
    var precast5 = (bitcast<u32>(precast4)<<4u);
    var cast1 = bitcast<i32>(precast5);
    var val1 = data1[(lidx0+cast0+cast1)];
    var alu0 = (lidx0+bitcast<i32>(precast2)+cast0+cast1);
    var val2 = atomicLoad(&data2[(alu0/4)]);
    var alu1 = ((val2>>(((u32(alu0))&3u)<<3u))&255u);
    var precast6 = (select(0u,4294967040u,(0u<(alu1>>7u)))|alu1);
    acc0 = (acc0+(val1*(f32((i32(bitcast<i32>(precast6)))))*val0));
  }
  var precast7 = lidx0;
  var precast8 = (bitcast<u32>(precast7)<<5u);
  temp0[(lidx1+bitcast<i32>(precast8))] = acc0;
  workgroupBarrier();
  if ((((bool(lidx0))!=true)&((bool(lidx1))!=true))) {
    var acc1 = 0.0f;
    for (var ridx1 = 0; ridx1 < 16; ridx1++) {
      var precast9 = ridx1;
      var precast10 = (bitcast<u32>(precast9)<<5u);
      for (var ridx2 = 0; ridx2 < 32; ridx2++) {
        var val3 = temp0[(bitcast<i32>(precast10)+ridx2)];
        acc1 = (acc1+val3);
      }
    }
    data0[gidx0] = acc1;
  }
}`;

const r_8192_16_32_4n1 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
var<workgroup> temp0: array<f32, 16>;
@group(0) @binding(1)var<storage,read_write>data0:array<f32>;
@group(0) @binding(2)var<storage,read_write>data1:array<f32>;
@group(0) @binding(3)var<storage,read_write>data2:array<atomic<u32>>;
@group(0) @binding(4)var<storage,read_write>data3:array<f32>;
@group(0) @binding(5)var<storage,read_write>data4:array<f32>;
@compute @workgroup_size(16) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 8192 */
  var lidx0 = i32(lindex.x); /* 16 */
  var val0 = data4[gidx0];
  var val1 = data3[gidx0];
  var precast0 = gidx0;
  var precast1 = (bitcast<u32>(precast0)<<11u);
  var acc0 = 0.0f;
  for (var ridx0 = 0; ridx0 < 32; ridx0++) {
    var precast2 = ridx0;
    var precast3 = (bitcast<u32>(precast2)<<6u);
    var cast0 = bitcast<i32>(precast3);
    var alu0 = (lidx0+cast0);
    var val2 = data1[alu0];
    var alu1 = (lidx0+bitcast<i32>(precast1)+cast0);
    var val3 = data1[(alu0+16)];
    var val4 = data1[(alu0+32)];
    var val5 = data1[(alu0+48)];
    var alu2 = (alu1+16);
    var alu3 = (alu1+32);
    var alu4 = (alu1+48);
    var val6 = atomicLoad(&data2[(alu1/4)]);
    var val7 = atomicLoad(&data2[(alu2/4)]);
    var val8 = atomicLoad(&data2[(alu3/4)]);
    var val9 = atomicLoad(&data2[(alu4/4)]);
    var alu5 = ((val6>>(((u32(alu1))&3u)<<3u))&255u);
    var alu6 = ((val7>>(((u32(alu2))&3u)<<3u))&255u);
    var alu7 = ((val8>>(((u32(alu3))&3u)<<3u))&255u);
    var alu8 = ((val9>>(((u32(alu4))&3u)<<3u))&255u);
    var precast4 = (select(0u,4294967040u,(0u<(alu5>>7u)))|alu5);
    var precast5 = (select(0u,4294967040u,(0u<(alu6>>7u)))|alu6);
    var precast6 = (select(0u,4294967040u,(0u<(alu7>>7u)))|alu7);
    var precast7 = (select(0u,4294967040u,(0u<(alu8>>7u)))|alu8);
    acc0 = (acc0+(val2*(f32((i32(bitcast<i32>(precast4)))))*val1)+(val3*(f32((i32(bitcast<i32>(precast5)))))*val1)+(val4*(f32((i32(bitcast<i32>(precast6)))))*val1)+(val5*(f32((i32(bitcast<i32>(precast7)))))*val1));
  }
  temp0[lidx0] = acc0;
  workgroupBarrier();
  if (((bool(lidx0))!=true)) {
    var acc1 = 0.0f;
    for (var ridx1 = 0; ridx1 < 16; ridx1++) {
      var val10 = temp0[ridx1];
      acc1 = (acc1+val10);
    }
    data0[gidx0] = (acc1*(1/(1.0f+exp2((acc1*-1.4426950408889634f))))*val0);
  }
}`;

const r_2048_16_16_32 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
var<workgroup> temp0: array<f32, 256>;
@group(0) @binding(1)var<storage,read_write>data0:array<f32>;
@group(0) @binding(2)var<storage,read_write>data1:array<f32>;
@group(0) @binding(3)var<storage,read_write>data2:array<f32>;
@group(0) @binding(4)var<storage,read_write>data3:array<atomic<u32>>;
@group(0) @binding(5)var<storage,read_write>data4:array<f32>;
@compute @workgroup_size(16,16) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 2048 */
  var lidx0 = i32(lindex.x); /* 16 */
  var lidx1 = i32(lindex.y); /* 16 */
  var val0 = data1[gidx0];
  var val1 = data4[gidx0];
  var precast0 = gidx0;
  var precast1 = lidx1;
  var precast2 = (bitcast<u32>(precast0)<<13u);
  var precast3 = (bitcast<u32>(precast1)<<9u);
  var cast0 = bitcast<i32>(precast3);
  var acc0 = 0.0f;
  for (var ridx0 = 0; ridx0 < 32; ridx0++) {
    var precast4 = ridx0;
    var precast5 = (bitcast<u32>(precast4)<<4u);
    var cast1 = bitcast<i32>(precast5);
    var val2 = data2[(lidx0+cast0+cast1)];
    var alu0 = (lidx0+bitcast<i32>(precast2)+cast0+cast1);
    var val3 = atomicLoad(&data3[(alu0/4)]);
    var alu1 = ((val3>>(((u32(alu0))&3u)<<3u))&255u);
    var precast6 = (select(0u,4294967040u,(0u<(alu1>>7u)))|alu1);
    acc0 = (acc0+(val2*(f32((i32(bitcast<i32>(precast6)))))*val1));
  }
  var precast7 = lidx0;
  var precast8 = (bitcast<u32>(precast7)<<4u);
  temp0[(lidx1+bitcast<i32>(precast8))] = acc0;
  workgroupBarrier();
  if ((((bool(lidx0))!=true)&((bool(lidx1))!=true))) {
    var acc1 = 0.0f;
    for (var ridx1 = 0; ridx1 < 16; ridx1++) {
      var precast9 = ridx1;
      var precast10 = (bitcast<u32>(precast9)<<4u);
      for (var ridx2 = 0; ridx2 < 16; ridx2++) {
        var val4 = temp0[(bitcast<i32>(precast10)+ridx2)];
        acc1 = (acc1+val4);
      }
    }
    data0[gidx0] = (val0+acc1);
  }
}`;

const E_n7 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
@group(0) @binding(1)var<storage,read_write>data0:array<u32>;
@compute @workgroup_size(1) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var val0 = data0[0];
  data0[0] = (val0+1u);
}`;

const E_n8 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
@group(0) @binding(1)var<storage,read_write>data0:array<u32>;
@group(0) @binding(2)var<storage,read_write>data1:array<u32>;
@group(0) @binding(3)var<storage,read_write>data2:array<u32>;
@compute @workgroup_size(1) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var val0 = data1[0];
  var val1 = data2[0];
  var val2 = data2[1];
  var alu0 = (val0+val2);
  var alu1 = (alu0+val0+val1);
  var alu2 = (val1^val2^466688986u);
  var alu3 = ((alu1+1u)^((val0<<13u)+(val2<<13u)+((alu0+1u)>>19u)+8192u));
  var alu4 = (alu1+alu3);
  var alu5 = ((alu4+1u)^((alu3<<15u)+(alu3>>17u)));
  var alu6 = (alu4+alu5);
  var alu7 = ((alu6+1u)^((alu5<<26u)+(alu5>>6u)));
  var alu8 = (alu6+alu7);
  var alu9 = ((alu8+1u)^((alu7<<6u)+(alu7>>26u)));
  var alu10 = (alu9+alu2);
  var alu11 = (alu10+alu8+val2);
  var alu12 = ((alu11+2u)^((alu9<<17u)+(alu2<<17u)+((alu10+1u)>>15u)+131072u));
  var alu13 = (alu11+alu12);
  var alu14 = ((alu13+2u)^((alu12<<29u)+(alu12>>3u)));
  var alu15 = (alu13+alu14);
  var alu16 = ((alu15+2u)^((alu14<<16u)+(alu14>>16u)));
  var alu17 = (alu15+alu16);
  var alu18 = ((alu17+2u)^((alu16<<24u)+(alu16>>8u)));
  var alu19 = (alu18+val1);
  var alu20 = (alu19+alu17+alu2);
  var alu21 = ((alu20+4u)^((alu18<<13u)+(val1<<13u)+((alu19+2u)>>19u)+16384u));
  var alu22 = (alu20+alu21);
  var alu23 = ((alu22+4u)^((alu21<<15u)+(alu21>>17u)));
  var alu24 = (alu22+alu23);
  var alu25 = ((alu24+4u)^((alu23<<26u)+(alu23>>6u)));
  var alu26 = (alu24+alu25);
  var alu27 = ((alu26+4u)^((alu25<<6u)+(alu25>>26u)));
  var alu28 = (alu27+val2);
  var alu29 = (alu28+alu26+val1);
  var alu30 = ((alu29+7u)^((alu27<<17u)+(val2<<17u)+((alu28+3u)>>15u)+393216u));
  var alu31 = (alu29+alu30);
  var alu32 = ((alu31+7u)^((alu30<<29u)+(alu30>>3u)));
  var alu33 = (alu31+alu32);
  var alu34 = ((alu33+7u)^((alu32<<16u)+(alu32>>16u)));
  var alu35 = (alu33+alu34);
  var alu36 = ((alu35+7u)^((alu34<<24u)+(alu34>>8u)));
  var alu37 = (alu36+alu2);
  var alu38 = (alu37+alu35+val2);
  var alu39 = ((alu38+11u)^((alu36<<13u)+(alu2<<13u)+((alu37+4u)>>19u)+32768u));
  var alu40 = (alu38+alu39);
  var alu41 = ((alu40+11u)^((alu39<<15u)+(alu39>>17u)));
  var alu42 = (alu40+alu41);
  var alu43 = ((alu42+11u)^((alu41<<26u)+(alu41>>6u)));
  data0[0] = (((alu42+alu43+11u)^((alu43<<6u)+(alu43>>26u)))+val1+5u);
}`;

const E_n9 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
@group(0) @binding(1)var<storage,read_write>data0:array<f32>;
@group(0) @binding(2)var<storage,read_write>data1:array<u32>;
@group(0) @binding(3)var<storage,read_write>data2:array<u32>;
@compute @workgroup_size(1) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var val0 = data1[0];
  var val1 = data2[0];
  var val2 = data2[1];
  var alu0 = (val0+val2);
  var alu1 = (alu0+val0+val1);
  var alu2 = (val1^val2^466688986u);
  var alu3 = ((alu1+1u)^((val0<<13u)+(val2<<13u)+((alu0+1u)>>19u)+8192u));
  var alu4 = (alu1+alu3);
  var alu5 = ((alu4+1u)^((alu3<<15u)+(alu3>>17u)));
  var alu6 = (alu4+alu5);
  var alu7 = ((alu6+1u)^((alu5<<26u)+(alu5>>6u)));
  var alu8 = (alu6+alu7);
  var alu9 = ((alu8+1u)^((alu7<<6u)+(alu7>>26u)));
  var alu10 = (alu9+alu2);
  var alu11 = (alu10+alu8+val2);
  var alu12 = ((alu11+2u)^((alu9<<17u)+(alu2<<17u)+((alu10+1u)>>15u)+131072u));
  var alu13 = (alu11+alu12);
  var alu14 = ((alu13+2u)^((alu12<<29u)+(alu12>>3u)));
  var alu15 = (alu13+alu14);
  var alu16 = ((alu15+2u)^((alu14<<16u)+(alu14>>16u)));
  var alu17 = (alu15+alu16);
  var alu18 = ((alu17+2u)^((alu16<<24u)+(alu16>>8u)));
  var alu19 = (alu18+val1);
  var alu20 = (alu19+alu17+alu2);
  var alu21 = ((alu20+4u)^((alu18<<13u)+(val1<<13u)+((alu19+2u)>>19u)+16384u));
  var alu22 = (alu20+alu21);
  var alu23 = ((alu22+4u)^((alu21<<15u)+(alu21>>17u)));
  var alu24 = (alu22+alu23);
  var alu25 = ((alu24+4u)^((alu23<<26u)+(alu23>>6u)));
  var alu26 = (alu24+alu25);
  var alu27 = ((alu26+4u)^((alu25<<6u)+(alu25>>26u)));
  var alu28 = (alu27+val2);
  var alu29 = (alu28+alu26+val1);
  var alu30 = ((alu29+7u)^((alu27<<17u)+(val2<<17u)+((alu28+3u)>>15u)+393216u));
  var alu31 = (alu29+alu30);
  var alu32 = ((alu31+7u)^((alu30<<29u)+(alu30>>3u)));
  var alu33 = (alu31+alu32);
  var alu34 = ((alu33+7u)^((alu32<<16u)+(alu32>>16u)));
  var alu35 = (alu33+alu34);
  var alu36 = ((alu35+7u)^((alu34<<24u)+(alu34>>8u)));
  var alu37 = (alu36+alu2);
  var alu38 = (alu37+alu35+val2);
  var alu39 = ((alu38+11u)^((alu36<<13u)+(alu2<<13u)+((alu37+4u)>>19u)+32768u));
  var alu40 = (alu38+alu39);
  var alu41 = ((alu40+11u)^((alu39<<15u)+(alu39>>17u)));
  var alu42 = (alu40+alu41);
  var precast0 = (((alu42+((alu42+11u)^((alu41<<26u)+(alu41>>6u)))+alu2+11u)>>9u)|1065353216u);
  data0[0] = (bitcast<f32>(precast0)+-1.0f);
}`;

const r_21376_2_16_8_3_4_4 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
var<workgroup> temp0: array<f32, 96>;
@group(0) @binding(1)var<storage,read_write>data0:array<f32>;
@group(0) @binding(2)var<storage,read_write>data1:array<f32>;
@group(0) @binding(3)var<storage,read_write>data2:array<atomic<u32>>;
@group(0) @binding(4)var<storage,read_write>data3:array<f32>;
@compute @workgroup_size(2,16) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 21376 */
  var lidx0 = i32(lindex.x); /* 2 */
  var lidx1 = i32(lindex.y); /* 16 */
  var alu0 = ((gidx0*6)+(lidx0*3));
  var alu1 = (alu0+1);
  var alu2 = (alu0+2);
  var alu3 = (lidx0*48);
  var val0 = data3[alu1];
  var val1 = data3[alu2];
  var val2 = data3[alu0];
  var acc0 = 0.0f;
  var acc1 = 0.0f;
  var acc2 = 0.0f;
  for (var ridx0 = 0; ridx0 < 8; ridx0++) {
    var precast0 = ridx0;
    var precast1 = (bitcast<u32>(precast0)<<8u);
    var cast0 = bitcast<i32>(precast1);
    var alu4 = (lidx1+cast0);
    var val3 = data1[alu4];
    var val4 = data1[(alu4+16)];
    var val5 = data1[(alu4+32)];
    var val6 = data1[(alu4+48)];
    var val7 = data1[(alu4+64)];
    var val8 = data1[(alu4+80)];
    var val9 = data1[(alu4+96)];
    var val10 = data1[(alu4+112)];
    var val11 = data1[(alu4+128)];
    var val12 = data1[(alu4+144)];
    var val13 = data1[(alu4+160)];
    var val14 = data1[(alu4+176)];
    var val15 = data1[(alu4+192)];
    var val16 = data1[(alu4+208)];
    var val17 = data1[(alu4+224)];
    var val18 = data1[(alu4+240)];
    var alu5 = (lidx1+(gidx0*12288)+(lidx0*6144)+cast0);
    var alu6 = (alu5+16);
    var alu7 = (alu5+32);
    var alu8 = (alu5+48);
    var alu9 = (alu5+64);
    var alu10 = (alu5+80);
    var alu11 = (alu5+96);
    var alu12 = (alu5+112);
    var alu13 = (alu5+128);
    var alu14 = (alu5+144);
    var alu15 = (alu5+160);
    var alu16 = (alu5+176);
    var alu17 = (alu5+192);
    var alu18 = (alu5+208);
    var alu19 = (alu5+224);
    var alu20 = (alu5+240);
    var alu21 = (alu5+2048);
    var alu22 = (alu5+2064);
    var alu23 = (alu5+2080);
    var alu24 = (alu5+2096);
    var alu25 = (alu5+2112);
    var alu26 = (alu5+2128);
    var alu27 = (alu5+2144);
    var alu28 = (alu5+2160);
    var alu29 = (alu5+2176);
    var alu30 = (alu5+2192);
    var alu31 = (alu5+2208);
    var alu32 = (alu5+2224);
    var alu33 = (alu5+2240);
    var alu34 = (alu5+2256);
    var alu35 = (alu5+2272);
    var alu36 = (alu5+2288);
    var alu37 = (alu5+4096);
    var alu38 = (alu5+4112);
    var alu39 = (alu5+4128);
    var alu40 = (alu5+4144);
    var alu41 = (alu5+4160);
    var alu42 = (alu5+4176);
    var alu43 = (alu5+4192);
    var alu44 = (alu5+4208);
    var alu45 = (alu5+4224);
    var alu46 = (alu5+4240);
    var alu47 = (alu5+4256);
    var alu48 = (alu5+4272);
    var alu49 = (alu5+4288);
    var alu50 = (alu5+4304);
    var alu51 = (alu5+4320);
    var alu52 = (alu5+4336);
    var val19 = atomicLoad(&data2[(alu5/4)]);
    var val20 = atomicLoad(&data2[(alu6/4)]);
    var val21 = atomicLoad(&data2[(alu7/4)]);
    var val22 = atomicLoad(&data2[(alu8/4)]);
    var val23 = atomicLoad(&data2[(alu9/4)]);
    var val24 = atomicLoad(&data2[(alu10/4)]);
    var val25 = atomicLoad(&data2[(alu11/4)]);
    var val26 = atomicLoad(&data2[(alu12/4)]);
    var val27 = atomicLoad(&data2[(alu13/4)]);
    var val28 = atomicLoad(&data2[(alu14/4)]);
    var val29 = atomicLoad(&data2[(alu15/4)]);
    var val30 = atomicLoad(&data2[(alu16/4)]);
    var val31 = atomicLoad(&data2[(alu17/4)]);
    var val32 = atomicLoad(&data2[(alu18/4)]);
    var val33 = atomicLoad(&data2[(alu19/4)]);
    var val34 = atomicLoad(&data2[(alu20/4)]);
    var val35 = atomicLoad(&data2[(alu21/4)]);
    var val36 = atomicLoad(&data2[(alu22/4)]);
    var val37 = atomicLoad(&data2[(alu23/4)]);
    var val38 = atomicLoad(&data2[(alu24/4)]);
    var val39 = atomicLoad(&data2[(alu25/4)]);
    var val40 = atomicLoad(&data2[(alu26/4)]);
    var val41 = atomicLoad(&data2[(alu27/4)]);
    var val42 = atomicLoad(&data2[(alu28/4)]);
    var val43 = atomicLoad(&data2[(alu29/4)]);
    var val44 = atomicLoad(&data2[(alu30/4)]);
    var val45 = atomicLoad(&data2[(alu31/4)]);
    var val46 = atomicLoad(&data2[(alu32/4)]);
    var val47 = atomicLoad(&data2[(alu33/4)]);
    var val48 = atomicLoad(&data2[(alu34/4)]);
    var val49 = atomicLoad(&data2[(alu35/4)]);
    var val50 = atomicLoad(&data2[(alu36/4)]);
    var val51 = atomicLoad(&data2[(alu37/4)]);
    var val52 = atomicLoad(&data2[(alu38/4)]);
    var val53 = atomicLoad(&data2[(alu39/4)]);
    var val54 = atomicLoad(&data2[(alu40/4)]);
    var val55 = atomicLoad(&data2[(alu41/4)]);
    var val56 = atomicLoad(&data2[(alu42/4)]);
    var val57 = atomicLoad(&data2[(alu43/4)]);
    var val58 = atomicLoad(&data2[(alu44/4)]);
    var val59 = atomicLoad(&data2[(alu45/4)]);
    var val60 = atomicLoad(&data2[(alu46/4)]);
    var val61 = atomicLoad(&data2[(alu47/4)]);
    var val62 = atomicLoad(&data2[(alu48/4)]);
    var val63 = atomicLoad(&data2[(alu49/4)]);
    var val64 = atomicLoad(&data2[(alu50/4)]);
    var val65 = atomicLoad(&data2[(alu51/4)]);
    var val66 = atomicLoad(&data2[(alu52/4)]);
    var alu53 = ((val19>>(((u32(alu5))&3u)<<3u))&255u);
    var alu54 = ((val20>>(((u32(alu6))&3u)<<3u))&255u);
    var alu55 = ((val21>>(((u32(alu7))&3u)<<3u))&255u);
    var alu56 = ((val22>>(((u32(alu8))&3u)<<3u))&255u);
    var alu57 = ((val23>>(((u32(alu9))&3u)<<3u))&255u);
    var alu58 = ((val24>>(((u32(alu10))&3u)<<3u))&255u);
    var alu59 = ((val25>>(((u32(alu11))&3u)<<3u))&255u);
    var alu60 = ((val26>>(((u32(alu12))&3u)<<3u))&255u);
    var alu61 = ((val27>>(((u32(alu13))&3u)<<3u))&255u);
    var alu62 = ((val28>>(((u32(alu14))&3u)<<3u))&255u);
    var alu63 = ((val29>>(((u32(alu15))&3u)<<3u))&255u);
    var alu64 = ((val30>>(((u32(alu16))&3u)<<3u))&255u);
    var alu65 = ((val31>>(((u32(alu17))&3u)<<3u))&255u);
    var alu66 = ((val32>>(((u32(alu18))&3u)<<3u))&255u);
    var alu67 = ((val33>>(((u32(alu19))&3u)<<3u))&255u);
    var alu68 = ((val34>>(((u32(alu20))&3u)<<3u))&255u);
    var alu69 = ((val35>>(((u32(alu21))&3u)<<3u))&255u);
    var alu70 = ((val36>>(((u32(alu22))&3u)<<3u))&255u);
    var alu71 = ((val37>>(((u32(alu23))&3u)<<3u))&255u);
    var alu72 = ((val38>>(((u32(alu24))&3u)<<3u))&255u);
    var alu73 = ((val39>>(((u32(alu25))&3u)<<3u))&255u);
    var alu74 = ((val40>>(((u32(alu26))&3u)<<3u))&255u);
    var alu75 = ((val41>>(((u32(alu27))&3u)<<3u))&255u);
    var alu76 = ((val42>>(((u32(alu28))&3u)<<3u))&255u);
    var alu77 = ((val43>>(((u32(alu29))&3u)<<3u))&255u);
    var alu78 = ((val44>>(((u32(alu30))&3u)<<3u))&255u);
    var alu79 = ((val45>>(((u32(alu31))&3u)<<3u))&255u);
    var alu80 = ((val46>>(((u32(alu32))&3u)<<3u))&255u);
    var alu81 = ((val47>>(((u32(alu33))&3u)<<3u))&255u);
    var alu82 = ((val48>>(((u32(alu34))&3u)<<3u))&255u);
    var alu83 = ((val49>>(((u32(alu35))&3u)<<3u))&255u);
    var alu84 = ((val50>>(((u32(alu36))&3u)<<3u))&255u);
    var alu85 = ((val51>>(((u32(alu37))&3u)<<3u))&255u);
    var alu86 = ((val52>>(((u32(alu38))&3u)<<3u))&255u);
    var alu87 = ((val53>>(((u32(alu39))&3u)<<3u))&255u);
    var alu88 = ((val54>>(((u32(alu40))&3u)<<3u))&255u);
    var alu89 = ((val55>>(((u32(alu41))&3u)<<3u))&255u);
    var alu90 = ((val56>>(((u32(alu42))&3u)<<3u))&255u);
    var alu91 = ((val57>>(((u32(alu43))&3u)<<3u))&255u);
    var alu92 = ((val58>>(((u32(alu44))&3u)<<3u))&255u);
    var alu93 = ((val59>>(((u32(alu45))&3u)<<3u))&255u);
    var alu94 = ((val60>>(((u32(alu46))&3u)<<3u))&255u);
    var alu95 = ((val61>>(((u32(alu47))&3u)<<3u))&255u);
    var alu96 = ((val62>>(((u32(alu48))&3u)<<3u))&255u);
    var alu97 = ((val63>>(((u32(alu49))&3u)<<3u))&255u);
    var alu98 = ((val64>>(((u32(alu50))&3u)<<3u))&255u);
    var alu99 = ((val65>>(((u32(alu51))&3u)<<3u))&255u);
    var alu100 = ((val66>>(((u32(alu52))&3u)<<3u))&255u);
    var precast2 = (select(0u,4294967040u,(0u<(alu53>>7u)))|alu53);
    var precast3 = (select(0u,4294967040u,(0u<(alu54>>7u)))|alu54);
    var precast4 = (select(0u,4294967040u,(0u<(alu55>>7u)))|alu55);
    var precast5 = (select(0u,4294967040u,(0u<(alu56>>7u)))|alu56);
    var precast6 = (select(0u,4294967040u,(0u<(alu57>>7u)))|alu57);
    var precast7 = (select(0u,4294967040u,(0u<(alu58>>7u)))|alu58);
    var precast8 = (select(0u,4294967040u,(0u<(alu59>>7u)))|alu59);
    var precast9 = (select(0u,4294967040u,(0u<(alu60>>7u)))|alu60);
    var precast10 = (select(0u,4294967040u,(0u<(alu61>>7u)))|alu61);
    var precast11 = (select(0u,4294967040u,(0u<(alu62>>7u)))|alu62);
    var precast12 = (select(0u,4294967040u,(0u<(alu63>>7u)))|alu63);
    var precast13 = (select(0u,4294967040u,(0u<(alu64>>7u)))|alu64);
    var precast14 = (select(0u,4294967040u,(0u<(alu65>>7u)))|alu65);
    var precast15 = (select(0u,4294967040u,(0u<(alu66>>7u)))|alu66);
    var precast16 = (select(0u,4294967040u,(0u<(alu67>>7u)))|alu67);
    var precast17 = (select(0u,4294967040u,(0u<(alu68>>7u)))|alu68);
    var precast18 = (select(0u,4294967040u,(0u<(alu69>>7u)))|alu69);
    var precast19 = (select(0u,4294967040u,(0u<(alu70>>7u)))|alu70);
    var precast20 = (select(0u,4294967040u,(0u<(alu71>>7u)))|alu71);
    var precast21 = (select(0u,4294967040u,(0u<(alu72>>7u)))|alu72);
    var precast22 = (select(0u,4294967040u,(0u<(alu73>>7u)))|alu73);
    var precast23 = (select(0u,4294967040u,(0u<(alu74>>7u)))|alu74);
    var precast24 = (select(0u,4294967040u,(0u<(alu75>>7u)))|alu75);
    var precast25 = (select(0u,4294967040u,(0u<(alu76>>7u)))|alu76);
    var precast26 = (select(0u,4294967040u,(0u<(alu77>>7u)))|alu77);
    var precast27 = (select(0u,4294967040u,(0u<(alu78>>7u)))|alu78);
    var precast28 = (select(0u,4294967040u,(0u<(alu79>>7u)))|alu79);
    var precast29 = (select(0u,4294967040u,(0u<(alu80>>7u)))|alu80);
    var precast30 = (select(0u,4294967040u,(0u<(alu81>>7u)))|alu81);
    var precast31 = (select(0u,4294967040u,(0u<(alu82>>7u)))|alu82);
    var precast32 = (select(0u,4294967040u,(0u<(alu83>>7u)))|alu83);
    var precast33 = (select(0u,4294967040u,(0u<(alu84>>7u)))|alu84);
    var precast34 = (select(0u,4294967040u,(0u<(alu85>>7u)))|alu85);
    var precast35 = (select(0u,4294967040u,(0u<(alu86>>7u)))|alu86);
    var precast36 = (select(0u,4294967040u,(0u<(alu87>>7u)))|alu87);
    var precast37 = (select(0u,4294967040u,(0u<(alu88>>7u)))|alu88);
    var precast38 = (select(0u,4294967040u,(0u<(alu89>>7u)))|alu89);
    var precast39 = (select(0u,4294967040u,(0u<(alu90>>7u)))|alu90);
    var precast40 = (select(0u,4294967040u,(0u<(alu91>>7u)))|alu91);
    var precast41 = (select(0u,4294967040u,(0u<(alu92>>7u)))|alu92);
    var precast42 = (select(0u,4294967040u,(0u<(alu93>>7u)))|alu93);
    var precast43 = (select(0u,4294967040u,(0u<(alu94>>7u)))|alu94);
    var precast44 = (select(0u,4294967040u,(0u<(alu95>>7u)))|alu95);
    var precast45 = (select(0u,4294967040u,(0u<(alu96>>7u)))|alu96);
    var precast46 = (select(0u,4294967040u,(0u<(alu97>>7u)))|alu97);
    var precast47 = (select(0u,4294967040u,(0u<(alu98>>7u)))|alu98);
    var precast48 = (select(0u,4294967040u,(0u<(alu99>>7u)))|alu99);
    var precast49 = (select(0u,4294967040u,(0u<(alu100>>7u)))|alu100);
    acc0 = (acc0+(val3*(f32((i32(bitcast<i32>(precast2)))))*val2)+(val7*(f32((i32(bitcast<i32>(precast6)))))*val2)+(val11*(f32((i32(bitcast<i32>(precast10)))))*val2)+(val15*(f32((i32(bitcast<i32>(precast14)))))*val2)+(val4*(f32((i32(bitcast<i32>(precast3)))))*val2)+(val8*(f32((i32(bitcast<i32>(precast7)))))*val2)+(val12*(f32((i32(bitcast<i32>(precast11)))))*val2)+(val16*(f32((i32(bitcast<i32>(precast15)))))*val2)+(val5*(f32((i32(bitcast<i32>(precast4)))))*val2)+(val9*(f32((i32(bitcast<i32>(precast8)))))*val2)+(val13*(f32((i32(bitcast<i32>(precast12)))))*val2)+(val17*(f32((i32(bitcast<i32>(precast16)))))*val2)+(val6*(f32((i32(bitcast<i32>(precast5)))))*val2)+(val10*(f32((i32(bitcast<i32>(precast9)))))*val2)+(val14*(f32((i32(bitcast<i32>(precast13)))))*val2)+(val18*(f32((i32(bitcast<i32>(precast17)))))*val2));
    acc1 = (acc1+(val3*(f32((i32(bitcast<i32>(precast18)))))*val0)+(val7*(f32((i32(bitcast<i32>(precast22)))))*val0)+(val11*(f32((i32(bitcast<i32>(precast26)))))*val0)+(val15*(f32((i32(bitcast<i32>(precast30)))))*val0)+(val4*(f32((i32(bitcast<i32>(precast19)))))*val0)+(val8*(f32((i32(bitcast<i32>(precast23)))))*val0)+(val12*(f32((i32(bitcast<i32>(precast27)))))*val0)+(val16*(f32((i32(bitcast<i32>(precast31)))))*val0)+(val5*(f32((i32(bitcast<i32>(precast20)))))*val0)+(val9*(f32((i32(bitcast<i32>(precast24)))))*val0)+(val13*(f32((i32(bitcast<i32>(precast28)))))*val0)+(val17*(f32((i32(bitcast<i32>(precast32)))))*val0)+(val6*(f32((i32(bitcast<i32>(precast21)))))*val0)+(val10*(f32((i32(bitcast<i32>(precast25)))))*val0)+(val14*(f32((i32(bitcast<i32>(precast29)))))*val0)+(val18*(f32((i32(bitcast<i32>(precast33)))))*val0));
    acc2 = (acc2+(val3*(f32((i32(bitcast<i32>(precast34)))))*val1)+(val7*(f32((i32(bitcast<i32>(precast38)))))*val1)+(val11*(f32((i32(bitcast<i32>(precast42)))))*val1)+(val15*(f32((i32(bitcast<i32>(precast46)))))*val1)+(val4*(f32((i32(bitcast<i32>(precast35)))))*val1)+(val8*(f32((i32(bitcast<i32>(precast39)))))*val1)+(val12*(f32((i32(bitcast<i32>(precast43)))))*val1)+(val16*(f32((i32(bitcast<i32>(precast47)))))*val1)+(val5*(f32((i32(bitcast<i32>(precast36)))))*val1)+(val9*(f32((i32(bitcast<i32>(precast40)))))*val1)+(val13*(f32((i32(bitcast<i32>(precast44)))))*val1)+(val17*(f32((i32(bitcast<i32>(precast48)))))*val1)+(val6*(f32((i32(bitcast<i32>(precast37)))))*val1)+(val10*(f32((i32(bitcast<i32>(precast41)))))*val1)+(val14*(f32((i32(bitcast<i32>(precast45)))))*val1)+(val18*(f32((i32(bitcast<i32>(precast49)))))*val1));
  }
  var alu105 = (alu3+(lidx1*3));
  temp0[alu105] = acc0;
  temp0[(alu105+1)] = acc1;
  temp0[(alu105+2)] = acc2;
  workgroupBarrier();
  if (((bool(lidx1))!=true)) {
    var acc3 = 0.0f;
    var acc4 = 0.0f;
    var acc5 = 0.0f;
    for (var ridx1 = 0; ridx1 < 16; ridx1++) {
      var alu111 = (alu3+(ridx1*3));
      var val67 = temp0[(alu111+1)];
      var val68 = temp0[(alu111+2)];
      var val69 = temp0[alu111];
      acc3 = (acc3+val69);
      acc4 = (acc4+val67);
      acc5 = (acc5+val68);
    }
    data0[alu1] = acc4;
    data0[alu2] = acc5;
    data0[alu0] = acc3;
  }
}`;

const r_256_501n3 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
var<workgroup> temp0: array<f32, 501>;
@group(0) @binding(1)var<storage,read_write>data0:array<f32>;
@group(0) @binding(2)var<storage,read_write>data1:array<f32>;
@compute @workgroup_size(167,3) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 256 */
  var lidx0 = i32(lindex.x); /* 167 */
  var lidx1 = i32(lindex.y); /* 3 */
  var alu0 = (lidx1+(lidx0*3));
  var val0 = data1[(alu0+(gidx0*501))];
  temp0[alu0] = (select(val0,(f32(-INFINITY)),(min(val0, 1.0) == 1.0 && max(val0, -1.0) == -1.0))*1.0526315789473684f);
  workgroupBarrier();
  if (((bool(alu0))!=true)) {
    var acc0 = (f32(-INFINITY));
    for (var ridx0 = 0; ridx0 < 501; ridx0++) {
      var val1 = temp0[ridx0];
      acc0 = select(acc0,val1,(acc0<val1));
    }
    data0[gidx0] = acc0;
  }
}`;

const r_64_4n6 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
@group(0) @binding(1)var<storage,read_write>data0:array<f32>;
@group(0) @binding(2)var<storage,read_write>data1:array<f32>;
@compute @workgroup_size(1) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var acc0 = (f32(-INFINITY));
  for (var ridx0 = 0; ridx0 < 64; ridx0++) {
    var precast0 = ridx0;
    var precast1 = (bitcast<u32>(precast0)<<2u);
    var cast0 = bitcast<i32>(precast1);
    var val0 = data1[cast0];
    var val1 = data1[(cast0+1)];
    var val2 = data1[(cast0+2)];
    var val3 = data1[(cast0+3)];
    var alu0 = select(val0,val1,(val0<val1));
    var alu1 = select(alu0,val2,(alu0<val2));
    var alu2 = select(alu1,val3,(alu1<val3));
    acc0 = select(acc0,alu2,(acc0<alu2));
  }
  data0[0] = acc0;
}`;

const r_256_501n4 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
var<workgroup> temp0: array<f32, 501>;
@group(0) @binding(1)var<storage,read_write>data0:array<f32>;
@group(0) @binding(2)var<storage,read_write>data1:array<f32>;
@group(0) @binding(3)var<storage,read_write>data2:array<f32>;
@compute @workgroup_size(167,3) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 256 */
  var lidx0 = i32(lindex.x); /* 167 */
  var lidx1 = i32(lindex.y); /* 3 */
  var val0 = data2[0];
  var alu0 = (lidx1+(lidx0*3));
  var val1 = data1[(alu0+(gidx0*501))];
  temp0[alu0] = exp2((((select(val1,(f32(-INFINITY)),(min(val1, 1.0) == 1.0 && max(val1, -1.0) == -1.0))*1.0526315789473684f)-val0)*1.4426950408889634f));
  workgroupBarrier();
  if (((bool(alu0))!=true)) {
    var acc0 = 0.0f;
    for (var ridx0 = 0; ridx0 < 501; ridx0++) {
      var val2 = temp0[ridx0];
      acc0 = (acc0+val2);
    }
    data0[gidx0] = acc0;
  }
}`;

const r_64_4n7 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
@group(0) @binding(1)var<storage,read_write>data0:array<f32>;
@group(0) @binding(2)var<storage,read_write>data1:array<f32>;
@compute @workgroup_size(1) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var acc0 = 0.0f;
  for (var ridx0 = 0; ridx0 < 64; ridx0++) {
    var precast0 = ridx0;
    var precast1 = (bitcast<u32>(precast0)<<2u);
    var cast0 = bitcast<i32>(precast1);
    var val0 = data1[cast0];
    var val1 = data1[(cast0+1)];
    var val2 = data1[(cast0+2)];
    var val3 = data1[(cast0+3)];
    acc0 = (acc0+val0+val1+val2+val3);
  }
  data0[0] = acc0;
}`;

const E_64128_2 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
@group(0) @binding(1)var<storage,read_write>data0:array<f32>;
@group(0) @binding(2)var<storage,read_write>data1:array<f32>;
@group(0) @binding(3)var<storage,read_write>data2:array<f32>;
@group(0) @binding(4)var<storage,read_write>data3:array<f32>;
@compute @workgroup_size(1) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 64128 */
  var precast0 = gidx0;
  var val0 = data2[0];
  var val1 = data3[0];
  var precast1 = (bitcast<u32>(precast0)<<1u);
  var cast0 = bitcast<i32>(precast1);
  var val2 = data1[cast0];
  var alu0 = (cast0+1);
  var val3 = data1[alu0];
  var alu1 = (1/val1);
  data0[cast0] = (exp2((((select(val2,(f32(-INFINITY)),(min(val2, 1.0) == 1.0 && max(val2, -1.0) == -1.0))*1.0526315789473684f)-val0)*1.4426950408889634f))*alu1);
  data0[alu0] = (exp2((((select(val3,(f32(-INFINITY)),(min(val3, 1.0) == 1.0 && max(val3, -1.0) == -1.0))*1.0526315789473684f)-val0)*1.4426950408889634f))*alu1);
}`;

const r_501_32_8_16_16 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
var<workgroup> temp0: array<f32, 128>;
@group(0) @binding(1)var<storage,read_write>data0:array<f32>;
@group(0) @binding(2)var<storage,read_write>data1:array<f32>;
@compute @workgroup_size(8,16) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 32 */
  var gidx1 = i32(gindex.y); /* 501 */
  var lidx0 = i32(lindex.x); /* 8 */
  var lidx1 = i32(lindex.y); /* 16 */
  var precast0 = gidx0;
  var precast1 = (bitcast<u32>(precast0)<<3u);
  var cast0 = bitcast<i32>(precast1);
  var precast2 = gidx1;
  var precast3 = (bitcast<u32>(precast2)<<8u);
  var cast1 = bitcast<i32>(precast3);
  var precast4 = lidx0;
  var precast5 = (bitcast<u32>(precast4)<<4u);
  var cast2 = bitcast<i32>(precast5);
  var acc0 = 0.0f;
  for (var ridx0 = 0; ridx0 < 16; ridx0++) {
    var precast6 = ridx0;
    var precast7 = (bitcast<u32>(precast6)<<4u);
    var alu0 = (lidx1+lidx0+cast0+bitcast<i32>(precast7));
    var val0 = select(0.0f, data1[(alu0+cast1+-255)], ((alu0<255)!=true));
    acc0 = (acc0+val0);
  }
  temp0[(lidx1+cast2)] = acc0;
  workgroupBarrier();
  if (((bool(lidx1))!=true)) {
    var acc1 = 0.0f;
    for (var ridx1 = 0; ridx1 < 16; ridx1++) {
      var val1 = temp0[(cast2+ridx1)];
      acc1 = (acc1+val1);
    }
    data0[(lidx0+cast0+cast1)] = acc1;
  }
}`;

const r_501_501n1 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
var<workgroup> temp0: array<f32, 501>;
@group(0) @binding(1)var<storage,read_write>data0:array<f32>;
@group(0) @binding(2)var<storage,read_write>data1:array<f32>;
@compute @workgroup_size(167,3) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 501 */
  var lidx0 = i32(lindex.x); /* 167 */
  var lidx1 = i32(lindex.y); /* 3 */
  var precast0 = gidx0;
  var precast1 = lidx1;
  var alu0 = (lidx0*3);
  var precast2 = (bitcast<u32>(precast0)<<8u);
  var precast3 = (bitcast<u32>(precast1)<<8u);
  var val0 = select(0.0f, data1[(bitcast<i32>(precast2)+(lidx0*768)+bitcast<i32>(precast3)+-128001)], (((lidx1+gidx0+alu0)<501)!=true));
  var alu1 = (lidx1+alu0);
  temp0[alu1] = val0;
  workgroupBarrier();
  if (((bool(alu1))!=true)) {
    var acc0 = 0.0f;
    for (var ridx0 = 0; ridx0 < 501; ridx0++) {
      var val1 = temp0[ridx0];
      acc0 = (acc0+val1);
    }
    data0[gidx0] = acc0;
  }
}`;

const r_256_501n5 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
var<workgroup> temp0: array<i32, 501>;
@group(0) @binding(1)var<storage,read_write>data0:array<i32>;
@group(0) @binding(2)var<storage,read_write>data1:array<f32>;
@group(0) @binding(3)var<storage,read_write>data2:array<f32>;
@group(0) @binding(4)var<storage,read_write>data3:array<f32>;
@compute @workgroup_size(167,3) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var gidx0 = i32(gindex.x); /* 256 */
  var lidx0 = i32(lindex.x); /* 167 */
  var lidx1 = i32(lindex.y); /* 3 */
  var val0 = data2[128255];
  var val1 = data3[500];
  var val2 = data1[0];
  var alu0 = (lidx1+(lidx0*3));
  var alu1 = (alu0+(gidx0*501));
  var val3 = data2[alu1];
  var val4 = data3[(alu1>>8)];
  temp0[alu0] = (i32(((val2<((val3+val4)*(1/(val0+val1))))!=true)));
  workgroupBarrier();
  if (((bool(alu0))!=true)) {
    var acc0 = 0;
    for (var ridx0 = 0; ridx0 < 501; ridx0++) {
      var val5 = temp0[ridx0];
      acc0 = (acc0+val5);
    }
    data0[gidx0] = acc0;
  }
}`;

const r_64_4n8 = `fn nan() -> f32 { let bits = 0xffffffffu; return bitcast<f32>(bits); }
@group(0) @binding(0)
var<uniform> INFINITY : f32;
@group(0) @binding(1)var<storage,read_write>data0:array<i32>;
@group(0) @binding(2)var<storage,read_write>data1:array<i32>;
@compute @workgroup_size(1) fn main(@builtin(workgroup_id) gindex: vec3<u32>,@builtin(local_invocation_id) lindex: vec3<u32>) {
  var acc0 = 0;
  for (var ridx0 = 0; ridx0 < 64; ridx0++) {
    var precast0 = ridx0;
    var precast1 = (bitcast<u32>(precast0)<<2u);
    var cast0 = bitcast<i32>(precast1);
    var val0 = data1[cast0];
    var val1 = data1[(cast0+1)];
    var val2 = data1[(cast0+2)];
    var val3 = data1[(cast0+3)];
    acc0 = (acc0+val3+val2+val1+val0);
  }
  data0[0] = acc0;
}`;

const setupNet = async (device, state_dict) => {
    
    const infinityBuf = createInfinityUniformBuf(device);

    const layouts=[device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 5, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 3, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 4, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]}),device.createBindGroupLayout({entries: [{binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' }}, {binding: 1, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } },{binding: 2, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'storage' } }]})]

    const buf_0 = createEmptyBuf(device, 2097152);;
    const buf_1 = createWeightBuf(device, 513024, state_dict['tok_embeddings.arange']);
    const input0 = createEmptyBuf(device, 4);;
    const buf_2 = createWeightBuf(device, 262668288, state_dict['tok_embeddings.weight']);
    const buf_3 = createWeightBuf(device, 513024, state_dict['tok_embeddings.scale']);
    const buf_4 = createEmptyBuf(device, 8192);;
    const buf_5 = createEmptyBuf(device, 4);;
    const buf_6 = createEmptyBuf(device, 8192);;
    const buf_7 = createWeightBuf(device, 8192, state_dict['layers.0.attention_norm.weight']);
    const buf_8 = createEmptyBuf(device, 2048);;
    const buf_9 = createWeightBuf(device, 1048576, state_dict['layers.0.attention.wk.weight']);
    const buf_10 = createWeightBuf(device, 2048, state_dict['layers.0.attention.wk.scale']);
    const buf_11 = createEmptyBuf(device, 2048);;
    const buf_12 = createWeightBuf(device, 1048576, state_dict['layers.0.attention.wv.weight']);
    const buf_13 = createWeightBuf(device, 2048, state_dict['layers.0.attention.wv.scale']);
    const buf_14 = createWeightBuf(device, 4194304, state_dict['layers.0.attention.cache_kv']);
    const buf_15 = createWeightBuf(device, 524288, state_dict['freqs_cis']);
    const buf_16 = createEmptyBuf(device, 8192);;
    const buf_17 = createWeightBuf(device, 4194304, state_dict['layers.0.attention.wq.weight']);
    const buf_18 = createWeightBuf(device, 8192, state_dict['layers.0.attention.wq.scale']);
    const buf_19 = createEmptyBuf(device, 8192);;
    const buf_20 = createEmptyBuf(device, 131200);;
    const buf_21 = createEmptyBuf(device, 128);;
    const buf_22 = createEmptyBuf(device, 128);;
    const buf_23 = createEmptyBuf(device, 131200);;
    const buf_24 = createWeightBuf(device, 4194304, state_dict['layers.0.attention.wo.weight']);
    const buf_25 = createWeightBuf(device, 8192, state_dict['layers.0.attention.wo.scale']);
    const buf_26 = createWeightBuf(device, 8192, state_dict['layers.0.ffn_norm.weight']);
    const buf_27 = createEmptyBuf(device, 32768);;
    const buf_28 = createWeightBuf(device, 16777216, state_dict['layers.0.feed_forward.w3.weight']);
    const buf_29 = createWeightBuf(device, 32768, state_dict['layers.0.feed_forward.w3.scale']);
    const buf_30 = createEmptyBuf(device, 32768);;
    const buf_31 = createWeightBuf(device, 16777216, state_dict['layers.0.feed_forward.w1.weight']);
    const buf_32 = createWeightBuf(device, 32768, state_dict['layers.0.feed_forward.w1.scale']);
    const buf_33 = createEmptyBuf(device, 8192);;
    const buf_34 = createWeightBuf(device, 16777216, state_dict['layers.0.feed_forward.w2.weight']);
    const buf_35 = createWeightBuf(device, 8192, state_dict['layers.0.feed_forward.w2.scale']);
    const buf_36 = createEmptyBuf(device, 8192);;
    const buf_37 = createWeightBuf(device, 8192, state_dict['layers.1.attention_norm.weight']);
    const buf_38 = createEmptyBuf(device, 2048);;
    const buf_39 = createWeightBuf(device, 1048576, state_dict['layers.1.attention.wk.weight']);
    const buf_40 = createWeightBuf(device, 2048, state_dict['layers.1.attention.wk.scale']);
    const buf_41 = createEmptyBuf(device, 2048);;
    const buf_42 = createWeightBuf(device, 1048576, state_dict['layers.1.attention.wv.weight']);
    const buf_43 = createWeightBuf(device, 2048, state_dict['layers.1.attention.wv.scale']);
    const buf_44 = createWeightBuf(device, 4194304, state_dict['layers.1.attention.cache_kv']);
    const buf_45 = createWeightBuf(device, 4194304, state_dict['layers.1.attention.wq.weight']);
    const buf_46 = createWeightBuf(device, 8192, state_dict['layers.1.attention.wq.scale']);
    const buf_47 = createWeightBuf(device, 4194304, state_dict['layers.1.attention.wo.weight']);
    const buf_48 = createWeightBuf(device, 8192, state_dict['layers.1.attention.wo.scale']);
    const buf_49 = createWeightBuf(device, 8192, state_dict['layers.1.ffn_norm.weight']);
    const buf_50 = createWeightBuf(device, 16777216, state_dict['layers.1.feed_forward.w3.weight']);
    const buf_51 = createWeightBuf(device, 32768, state_dict['layers.1.feed_forward.w3.scale']);
    const buf_52 = createWeightBuf(device, 16777216, state_dict['layers.1.feed_forward.w1.weight']);
    const buf_53 = createWeightBuf(device, 32768, state_dict['layers.1.feed_forward.w1.scale']);
    const buf_54 = createEmptyBuf(device, 8192);;
    const buf_55 = createWeightBuf(device, 16777216, state_dict['layers.1.feed_forward.w2.weight']);
    const buf_56 = createWeightBuf(device, 8192, state_dict['layers.1.feed_forward.w2.scale']);
    const buf_57 = createEmptyBuf(device, 8192);;
    const buf_58 = createWeightBuf(device, 8192, state_dict['layers.2.attention_norm.weight']);
    const buf_59 = createEmptyBuf(device, 2048);;
    const buf_60 = createWeightBuf(device, 1048576, state_dict['layers.2.attention.wk.weight']);
    const buf_61 = createWeightBuf(device, 2048, state_dict['layers.2.attention.wk.scale']);
    const buf_62 = createEmptyBuf(device, 2048);;
    const buf_63 = createWeightBuf(device, 1048576, state_dict['layers.2.attention.wv.weight']);
    const buf_64 = createWeightBuf(device, 2048, state_dict['layers.2.attention.wv.scale']);
    const buf_65 = createWeightBuf(device, 4194304, state_dict['layers.2.attention.cache_kv']);
    const buf_66 = createWeightBuf(device, 4194304, state_dict['layers.2.attention.wq.weight']);
    const buf_67 = createWeightBuf(device, 8192, state_dict['layers.2.attention.wq.scale']);
    const buf_68 = createWeightBuf(device, 4194304, state_dict['layers.2.attention.wo.weight']);
    const buf_69 = createWeightBuf(device, 8192, state_dict['layers.2.attention.wo.scale']);
    const buf_70 = createWeightBuf(device, 8192, state_dict['layers.2.ffn_norm.weight']);
    const buf_71 = createWeightBuf(device, 16777216, state_dict['layers.2.feed_forward.w3.weight']);
    const buf_72 = createWeightBuf(device, 32768, state_dict['layers.2.feed_forward.w3.scale']);
    const buf_73 = createWeightBuf(device, 16777216, state_dict['layers.2.feed_forward.w1.weight']);
    const buf_74 = createWeightBuf(device, 32768, state_dict['layers.2.feed_forward.w1.scale']);
    const buf_75 = createEmptyBuf(device, 8192);;
    const buf_76 = createWeightBuf(device, 16777216, state_dict['layers.2.feed_forward.w2.weight']);
    const buf_77 = createWeightBuf(device, 8192, state_dict['layers.2.feed_forward.w2.scale']);
    const buf_78 = createEmptyBuf(device, 8192);;
    const buf_79 = createWeightBuf(device, 8192, state_dict['layers.3.attention_norm.weight']);
    const buf_80 = createEmptyBuf(device, 2048);;
    const buf_81 = createWeightBuf(device, 1048576, state_dict['layers.3.attention.wk.weight']);
    const buf_82 = createWeightBuf(device, 2048, state_dict['layers.3.attention.wk.scale']);
    const buf_83 = createEmptyBuf(device, 2048);;
    const buf_84 = createWeightBuf(device, 1048576, state_dict['layers.3.attention.wv.weight']);
    const buf_85 = createWeightBuf(device, 2048, state_dict['layers.3.attention.wv.scale']);
    const buf_86 = createWeightBuf(device, 4194304, state_dict['layers.3.attention.cache_kv']);
    const buf_87 = createWeightBuf(device, 4194304, state_dict['layers.3.attention.wq.weight']);
    const buf_88 = createWeightBuf(device, 8192, state_dict['layers.3.attention.wq.scale']);
    const buf_89 = createWeightBuf(device, 4194304, state_dict['layers.3.attention.wo.weight']);
    const buf_90 = createWeightBuf(device, 8192, state_dict['layers.3.attention.wo.scale']);
    const buf_91 = createWeightBuf(device, 8192, state_dict['layers.3.ffn_norm.weight']);
    const buf_92 = createWeightBuf(device, 16777216, state_dict['layers.3.feed_forward.w3.weight']);
    const buf_93 = createWeightBuf(device, 32768, state_dict['layers.3.feed_forward.w3.scale']);
    const buf_94 = createWeightBuf(device, 16777216, state_dict['layers.3.feed_forward.w1.weight']);
    const buf_95 = createWeightBuf(device, 32768, state_dict['layers.3.feed_forward.w1.scale']);
    const buf_96 = createEmptyBuf(device, 8192);;
    const buf_97 = createWeightBuf(device, 16777216, state_dict['layers.3.feed_forward.w2.weight']);
    const buf_98 = createWeightBuf(device, 8192, state_dict['layers.3.feed_forward.w2.scale']);
    const buf_99 = createEmptyBuf(device, 8192);;
    const buf_100 = createWeightBuf(device, 8192, state_dict['layers.4.attention_norm.weight']);
    const buf_101 = createEmptyBuf(device, 2048);;
    const buf_102 = createWeightBuf(device, 1048576, state_dict['layers.4.attention.wk.weight']);
    const buf_103 = createWeightBuf(device, 2048, state_dict['layers.4.attention.wk.scale']);
    const buf_104 = createEmptyBuf(device, 2048);;
    const buf_105 = createWeightBuf(device, 1048576, state_dict['layers.4.attention.wv.weight']);
    const buf_106 = createWeightBuf(device, 2048, state_dict['layers.4.attention.wv.scale']);
    const buf_107 = createWeightBuf(device, 4194304, state_dict['layers.4.attention.cache_kv']);
    const buf_108 = createWeightBuf(device, 4194304, state_dict['layers.4.attention.wq.weight']);
    const buf_109 = createWeightBuf(device, 8192, state_dict['layers.4.attention.wq.scale']);
    const buf_110 = createWeightBuf(device, 4194304, state_dict['layers.4.attention.wo.weight']);
    const buf_111 = createWeightBuf(device, 8192, state_dict['layers.4.attention.wo.scale']);
    const buf_112 = createWeightBuf(device, 8192, state_dict['layers.4.ffn_norm.weight']);
    const buf_113 = createWeightBuf(device, 16777216, state_dict['layers.4.feed_forward.w3.weight']);
    const buf_114 = createWeightBuf(device, 32768, state_dict['layers.4.feed_forward.w3.scale']);
    const buf_115 = createWeightBuf(device, 16777216, state_dict['layers.4.feed_forward.w1.weight']);
    const buf_116 = createWeightBuf(device, 32768, state_dict['layers.4.feed_forward.w1.scale']);
    const buf_117 = createEmptyBuf(device, 8192);;
    const buf_118 = createWeightBuf(device, 16777216, state_dict['layers.4.feed_forward.w2.weight']);
    const buf_119 = createWeightBuf(device, 8192, state_dict['layers.4.feed_forward.w2.scale']);
    const buf_120 = createEmptyBuf(device, 8192);;
    const buf_121 = createWeightBuf(device, 8192, state_dict['layers.5.attention_norm.weight']);
    const buf_122 = createEmptyBuf(device, 2048);;
    const buf_123 = createWeightBuf(device, 1048576, state_dict['layers.5.attention.wk.weight']);
    const buf_124 = createWeightBuf(device, 2048, state_dict['layers.5.attention.wk.scale']);
    const buf_125 = createEmptyBuf(device, 2048);;
    const buf_126 = createWeightBuf(device, 1048576, state_dict['layers.5.attention.wv.weight']);
    const buf_127 = createWeightBuf(device, 2048, state_dict['layers.5.attention.wv.scale']);
    const buf_128 = createWeightBuf(device, 4194304, state_dict['layers.5.attention.cache_kv']);
    const buf_129 = createWeightBuf(device, 4194304, state_dict['layers.5.attention.wq.weight']);
    const buf_130 = createWeightBuf(device, 8192, state_dict['layers.5.attention.wq.scale']);
    const buf_131 = createWeightBuf(device, 4194304, state_dict['layers.5.attention.wo.weight']);
    const buf_132 = createWeightBuf(device, 8192, state_dict['layers.5.attention.wo.scale']);
    const buf_133 = createWeightBuf(device, 8192, state_dict['layers.5.ffn_norm.weight']);
    const buf_134 = createWeightBuf(device, 16777216, state_dict['layers.5.feed_forward.w3.weight']);
    const buf_135 = createWeightBuf(device, 32768, state_dict['layers.5.feed_forward.w3.scale']);
    const buf_136 = createWeightBuf(device, 16777216, state_dict['layers.5.feed_forward.w1.weight']);
    const buf_137 = createWeightBuf(device, 32768, state_dict['layers.5.feed_forward.w1.scale']);
    const buf_138 = createEmptyBuf(device, 8192);;
    const buf_139 = createWeightBuf(device, 16777216, state_dict['layers.5.feed_forward.w2.weight']);
    const buf_140 = createWeightBuf(device, 8192, state_dict['layers.5.feed_forward.w2.scale']);
    const buf_141 = createEmptyBuf(device, 8192);;
    const buf_142 = createWeightBuf(device, 8192, state_dict['layers.6.attention_norm.weight']);
    const buf_143 = createEmptyBuf(device, 2048);;
    const buf_144 = createWeightBuf(device, 1048576, state_dict['layers.6.attention.wk.weight']);
    const buf_145 = createWeightBuf(device, 2048, state_dict['layers.6.attention.wk.scale']);
    const buf_146 = createEmptyBuf(device, 2048);;
    const buf_147 = createWeightBuf(device, 1048576, state_dict['layers.6.attention.wv.weight']);
    const buf_148 = createWeightBuf(device, 2048, state_dict['layers.6.attention.wv.scale']);
    const buf_149 = createWeightBuf(device, 4194304, state_dict['layers.6.attention.cache_kv']);
    const buf_150 = createWeightBuf(device, 4194304, state_dict['layers.6.attention.wq.weight']);
    const buf_151 = createWeightBuf(device, 8192, state_dict['layers.6.attention.wq.scale']);
    const buf_152 = createWeightBuf(device, 4194304, state_dict['layers.6.attention.wo.weight']);
    const buf_153 = createWeightBuf(device, 8192, state_dict['layers.6.attention.wo.scale']);
    const buf_154 = createWeightBuf(device, 8192, state_dict['layers.6.ffn_norm.weight']);
    const buf_155 = createWeightBuf(device, 16777216, state_dict['layers.6.feed_forward.w3.weight']);
    const buf_156 = createWeightBuf(device, 32768, state_dict['layers.6.feed_forward.w3.scale']);
    const buf_157 = createWeightBuf(device, 16777216, state_dict['layers.6.feed_forward.w1.weight']);
    const buf_158 = createWeightBuf(device, 32768, state_dict['layers.6.feed_forward.w1.scale']);
    const buf_159 = createEmptyBuf(device, 8192);;
    const buf_160 = createWeightBuf(device, 16777216, state_dict['layers.6.feed_forward.w2.weight']);
    const buf_161 = createWeightBuf(device, 8192, state_dict['layers.6.feed_forward.w2.scale']);
    const buf_162 = createEmptyBuf(device, 8192);;
    const buf_163 = createWeightBuf(device, 8192, state_dict['layers.7.attention_norm.weight']);
    const buf_164 = createEmptyBuf(device, 2048);;
    const buf_165 = createWeightBuf(device, 1048576, state_dict['layers.7.attention.wk.weight']);
    const buf_166 = createWeightBuf(device, 2048, state_dict['layers.7.attention.wk.scale']);
    const buf_167 = createEmptyBuf(device, 2048);;
    const buf_168 = createWeightBuf(device, 1048576, state_dict['layers.7.attention.wv.weight']);
    const buf_169 = createWeightBuf(device, 2048, state_dict['layers.7.attention.wv.scale']);
    const buf_170 = createWeightBuf(device, 4194304, state_dict['layers.7.attention.cache_kv']);
    const buf_171 = createWeightBuf(device, 4194304, state_dict['layers.7.attention.wq.weight']);
    const buf_172 = createWeightBuf(device, 8192, state_dict['layers.7.attention.wq.scale']);
    const buf_173 = createWeightBuf(device, 4194304, state_dict['layers.7.attention.wo.weight']);
    const buf_174 = createWeightBuf(device, 8192, state_dict['layers.7.attention.wo.scale']);
    const buf_175 = createWeightBuf(device, 8192, state_dict['layers.7.ffn_norm.weight']);
    const buf_176 = createWeightBuf(device, 16777216, state_dict['layers.7.feed_forward.w3.weight']);
    const buf_177 = createWeightBuf(device, 32768, state_dict['layers.7.feed_forward.w3.scale']);
    const buf_178 = createWeightBuf(device, 16777216, state_dict['layers.7.feed_forward.w1.weight']);
    const buf_179 = createWeightBuf(device, 32768, state_dict['layers.7.feed_forward.w1.scale']);
    const buf_180 = createEmptyBuf(device, 8192);;
    const buf_181 = createWeightBuf(device, 16777216, state_dict['layers.7.feed_forward.w2.weight']);
    const buf_182 = createWeightBuf(device, 8192, state_dict['layers.7.feed_forward.w2.scale']);
    const buf_183 = createEmptyBuf(device, 8192);;
    const buf_184 = createWeightBuf(device, 8192, state_dict['layers.8.attention_norm.weight']);
    const buf_185 = createEmptyBuf(device, 2048);;
    const buf_186 = createWeightBuf(device, 1048576, state_dict['layers.8.attention.wk.weight']);
    const buf_187 = createWeightBuf(device, 2048, state_dict['layers.8.attention.wk.scale']);
    const buf_188 = createEmptyBuf(device, 2048);;
    const buf_189 = createWeightBuf(device, 1048576, state_dict['layers.8.attention.wv.weight']);
    const buf_190 = createWeightBuf(device, 2048, state_dict['layers.8.attention.wv.scale']);
    const buf_191 = createWeightBuf(device, 4194304, state_dict['layers.8.attention.cache_kv']);
    const buf_192 = createWeightBuf(device, 4194304, state_dict['layers.8.attention.wq.weight']);
    const buf_193 = createWeightBuf(device, 8192, state_dict['layers.8.attention.wq.scale']);
    const buf_194 = createWeightBuf(device, 4194304, state_dict['layers.8.attention.wo.weight']);
    const buf_195 = createWeightBuf(device, 8192, state_dict['layers.8.attention.wo.scale']);
    const buf_196 = createWeightBuf(device, 8192, state_dict['layers.8.ffn_norm.weight']);
    const buf_197 = createWeightBuf(device, 16777216, state_dict['layers.8.feed_forward.w3.weight']);
    const buf_198 = createWeightBuf(device, 32768, state_dict['layers.8.feed_forward.w3.scale']);
    const buf_199 = createWeightBuf(device, 16777216, state_dict['layers.8.feed_forward.w1.weight']);
    const buf_200 = createWeightBuf(device, 32768, state_dict['layers.8.feed_forward.w1.scale']);
    const buf_201 = createEmptyBuf(device, 8192);;
    const buf_202 = createWeightBuf(device, 16777216, state_dict['layers.8.feed_forward.w2.weight']);
    const buf_203 = createWeightBuf(device, 8192, state_dict['layers.8.feed_forward.w2.scale']);
    const buf_204 = createEmptyBuf(device, 8192);;
    const buf_205 = createWeightBuf(device, 8192, state_dict['layers.9.attention_norm.weight']);
    const buf_206 = createEmptyBuf(device, 2048);;
    const buf_207 = createWeightBuf(device, 1048576, state_dict['layers.9.attention.wk.weight']);
    const buf_208 = createWeightBuf(device, 2048, state_dict['layers.9.attention.wk.scale']);
    const buf_209 = createEmptyBuf(device, 2048);;
    const buf_210 = createWeightBuf(device, 1048576, state_dict['layers.9.attention.wv.weight']);
    const buf_211 = createWeightBuf(device, 2048, state_dict['layers.9.attention.wv.scale']);
    const buf_212 = createWeightBuf(device, 4194304, state_dict['layers.9.attention.cache_kv']);
    const buf_213 = createWeightBuf(device, 4194304, state_dict['layers.9.attention.wq.weight']);
    const buf_214 = createWeightBuf(device, 8192, state_dict['layers.9.attention.wq.scale']);
    const buf_215 = createWeightBuf(device, 4194304, state_dict['layers.9.attention.wo.weight']);
    const buf_216 = createWeightBuf(device, 8192, state_dict['layers.9.attention.wo.scale']);
    const buf_217 = createWeightBuf(device, 8192, state_dict['layers.9.ffn_norm.weight']);
    const buf_218 = createWeightBuf(device, 16777216, state_dict['layers.9.feed_forward.w3.weight']);
    const buf_219 = createWeightBuf(device, 32768, state_dict['layers.9.feed_forward.w3.scale']);
    const buf_220 = createWeightBuf(device, 16777216, state_dict['layers.9.feed_forward.w1.weight']);
    const buf_221 = createWeightBuf(device, 32768, state_dict['layers.9.feed_forward.w1.scale']);
    const buf_222 = createEmptyBuf(device, 8192);;
    const buf_223 = createWeightBuf(device, 16777216, state_dict['layers.9.feed_forward.w2.weight']);
    const buf_224 = createWeightBuf(device, 8192, state_dict['layers.9.feed_forward.w2.scale']);
    const buf_225 = createEmptyBuf(device, 8192);;
    const buf_226 = createWeightBuf(device, 8192, state_dict['layers.10.attention_norm.weight']);
    const buf_227 = createEmptyBuf(device, 2048);;
    const buf_228 = createWeightBuf(device, 1048576, state_dict['layers.10.attention.wk.weight']);
    const buf_229 = createWeightBuf(device, 2048, state_dict['layers.10.attention.wk.scale']);
    const buf_230 = createEmptyBuf(device, 2048);;
    const buf_231 = createWeightBuf(device, 1048576, state_dict['layers.10.attention.wv.weight']);
    const buf_232 = createWeightBuf(device, 2048, state_dict['layers.10.attention.wv.scale']);
    const buf_233 = createWeightBuf(device, 4194304, state_dict['layers.10.attention.cache_kv']);
    const buf_234 = createWeightBuf(device, 4194304, state_dict['layers.10.attention.wq.weight']);
    const buf_235 = createWeightBuf(device, 8192, state_dict['layers.10.attention.wq.scale']);
    const buf_236 = createWeightBuf(device, 4194304, state_dict['layers.10.attention.wo.weight']);
    const buf_237 = createWeightBuf(device, 8192, state_dict['layers.10.attention.wo.scale']);
    const buf_238 = createWeightBuf(device, 8192, state_dict['layers.10.ffn_norm.weight']);
    const buf_239 = createWeightBuf(device, 16777216, state_dict['layers.10.feed_forward.w3.weight']);
    const buf_240 = createWeightBuf(device, 32768, state_dict['layers.10.feed_forward.w3.scale']);
    const buf_241 = createWeightBuf(device, 16777216, state_dict['layers.10.feed_forward.w1.weight']);
    const buf_242 = createWeightBuf(device, 32768, state_dict['layers.10.feed_forward.w1.scale']);
    const buf_243 = createEmptyBuf(device, 8192);;
    const buf_244 = createWeightBuf(device, 16777216, state_dict['layers.10.feed_forward.w2.weight']);
    const buf_245 = createWeightBuf(device, 8192, state_dict['layers.10.feed_forward.w2.scale']);
    const buf_246 = createEmptyBuf(device, 8192);;
    const buf_247 = createWeightBuf(device, 8192, state_dict['layers.11.attention_norm.weight']);
    const buf_248 = createEmptyBuf(device, 2048);;
    const buf_249 = createWeightBuf(device, 1048576, state_dict['layers.11.attention.wk.weight']);
    const buf_250 = createWeightBuf(device, 2048, state_dict['layers.11.attention.wk.scale']);
    const buf_251 = createEmptyBuf(device, 2048);;
    const buf_252 = createWeightBuf(device, 1048576, state_dict['layers.11.attention.wv.weight']);
    const buf_253 = createWeightBuf(device, 2048, state_dict['layers.11.attention.wv.scale']);
    const buf_254 = createWeightBuf(device, 4194304, state_dict['layers.11.attention.cache_kv']);
    const buf_255 = createWeightBuf(device, 4194304, state_dict['layers.11.attention.wq.weight']);
    const buf_256 = createWeightBuf(device, 8192, state_dict['layers.11.attention.wq.scale']);
    const buf_257 = createWeightBuf(device, 4194304, state_dict['layers.11.attention.wo.weight']);
    const buf_258 = createWeightBuf(device, 8192, state_dict['layers.11.attention.wo.scale']);
    const buf_259 = createWeightBuf(device, 8192, state_dict['layers.11.ffn_norm.weight']);
    const buf_260 = createWeightBuf(device, 16777216, state_dict['layers.11.feed_forward.w3.weight']);
    const buf_261 = createWeightBuf(device, 32768, state_dict['layers.11.feed_forward.w3.scale']);
    const buf_262 = createWeightBuf(device, 16777216, state_dict['layers.11.feed_forward.w1.weight']);
    const buf_263 = createWeightBuf(device, 32768, state_dict['layers.11.feed_forward.w1.scale']);
    const buf_264 = createEmptyBuf(device, 8192);;
    const buf_265 = createWeightBuf(device, 16777216, state_dict['layers.11.feed_forward.w2.weight']);
    const buf_266 = createWeightBuf(device, 8192, state_dict['layers.11.feed_forward.w2.scale']);
    const buf_267 = createEmptyBuf(device, 8192);;
    const buf_268 = createWeightBuf(device, 8192, state_dict['layers.12.attention_norm.weight']);
    const buf_269 = createEmptyBuf(device, 2048);;
    const buf_270 = createWeightBuf(device, 1048576, state_dict['layers.12.attention.wk.weight']);
    const buf_271 = createWeightBuf(device, 2048, state_dict['layers.12.attention.wk.scale']);
    const buf_272 = createEmptyBuf(device, 2048);;
    const buf_273 = createWeightBuf(device, 1048576, state_dict['layers.12.attention.wv.weight']);
    const buf_274 = createWeightBuf(device, 2048, state_dict['layers.12.attention.wv.scale']);
    const buf_275 = createWeightBuf(device, 4194304, state_dict['layers.12.attention.cache_kv']);
    const buf_276 = createWeightBuf(device, 4194304, state_dict['layers.12.attention.wq.weight']);
    const buf_277 = createWeightBuf(device, 8192, state_dict['layers.12.attention.wq.scale']);
    const buf_278 = createWeightBuf(device, 4194304, state_dict['layers.12.attention.wo.weight']);
    const buf_279 = createWeightBuf(device, 8192, state_dict['layers.12.attention.wo.scale']);
    const buf_280 = createWeightBuf(device, 8192, state_dict['layers.12.ffn_norm.weight']);
    const buf_281 = createWeightBuf(device, 16777216, state_dict['layers.12.feed_forward.w3.weight']);
    const buf_282 = createWeightBuf(device, 32768, state_dict['layers.12.feed_forward.w3.scale']);
    const buf_283 = createWeightBuf(device, 16777216, state_dict['layers.12.feed_forward.w1.weight']);
    const buf_284 = createWeightBuf(device, 32768, state_dict['layers.12.feed_forward.w1.scale']);
    const buf_285 = createEmptyBuf(device, 8192);;
    const buf_286 = createWeightBuf(device, 16777216, state_dict['layers.12.feed_forward.w2.weight']);
    const buf_287 = createWeightBuf(device, 8192, state_dict['layers.12.feed_forward.w2.scale']);
    const buf_288 = createEmptyBuf(device, 8192);;
    const buf_289 = createWeightBuf(device, 8192, state_dict['layers.13.attention_norm.weight']);
    const buf_290 = createEmptyBuf(device, 2048);;
    const buf_291 = createWeightBuf(device, 1048576, state_dict['layers.13.attention.wk.weight']);
    const buf_292 = createWeightBuf(device, 2048, state_dict['layers.13.attention.wk.scale']);
    const buf_293 = createEmptyBuf(device, 2048);;
    const buf_294 = createWeightBuf(device, 1048576, state_dict['layers.13.attention.wv.weight']);
    const buf_295 = createWeightBuf(device, 2048, state_dict['layers.13.attention.wv.scale']);
    const buf_296 = createWeightBuf(device, 4194304, state_dict['layers.13.attention.cache_kv']);
    const buf_297 = createWeightBuf(device, 4194304, state_dict['layers.13.attention.wq.weight']);
    const buf_298 = createWeightBuf(device, 8192, state_dict['layers.13.attention.wq.scale']);
    const buf_299 = createWeightBuf(device, 4194304, state_dict['layers.13.attention.wo.weight']);
    const buf_300 = createWeightBuf(device, 8192, state_dict['layers.13.attention.wo.scale']);
    const buf_301 = createWeightBuf(device, 8192, state_dict['layers.13.ffn_norm.weight']);
    const buf_302 = createWeightBuf(device, 16777216, state_dict['layers.13.feed_forward.w3.weight']);
    const buf_303 = createWeightBuf(device, 32768, state_dict['layers.13.feed_forward.w3.scale']);
    const buf_304 = createWeightBuf(device, 16777216, state_dict['layers.13.feed_forward.w1.weight']);
    const buf_305 = createWeightBuf(device, 32768, state_dict['layers.13.feed_forward.w1.scale']);
    const buf_306 = createEmptyBuf(device, 8192);;
    const buf_307 = createWeightBuf(device, 16777216, state_dict['layers.13.feed_forward.w2.weight']);
    const buf_308 = createWeightBuf(device, 8192, state_dict['layers.13.feed_forward.w2.scale']);
    const buf_309 = createEmptyBuf(device, 8192);;
    const buf_310 = createWeightBuf(device, 8192, state_dict['layers.14.attention_norm.weight']);
    const buf_311 = createEmptyBuf(device, 2048);;
    const buf_312 = createWeightBuf(device, 1048576, state_dict['layers.14.attention.wk.weight']);
    const buf_313 = createWeightBuf(device, 2048, state_dict['layers.14.attention.wk.scale']);
    const buf_314 = createEmptyBuf(device, 2048);;
    const buf_315 = createWeightBuf(device, 1048576, state_dict['layers.14.attention.wv.weight']);
    const buf_316 = createWeightBuf(device, 2048, state_dict['layers.14.attention.wv.scale']);
    const buf_317 = createWeightBuf(device, 4194304, state_dict['layers.14.attention.cache_kv']);
    const buf_318 = createWeightBuf(device, 4194304, state_dict['layers.14.attention.wq.weight']);
    const buf_319 = createWeightBuf(device, 8192, state_dict['layers.14.attention.wq.scale']);
    const buf_320 = createWeightBuf(device, 4194304, state_dict['layers.14.attention.wo.weight']);
    const buf_321 = createWeightBuf(device, 8192, state_dict['layers.14.attention.wo.scale']);
    const buf_322 = createWeightBuf(device, 8192, state_dict['layers.14.ffn_norm.weight']);
    const buf_323 = createWeightBuf(device, 16777216, state_dict['layers.14.feed_forward.w3.weight']);
    const buf_324 = createWeightBuf(device, 32768, state_dict['layers.14.feed_forward.w3.scale']);
    const buf_325 = createWeightBuf(device, 16777216, state_dict['layers.14.feed_forward.w1.weight']);
    const buf_326 = createWeightBuf(device, 32768, state_dict['layers.14.feed_forward.w1.scale']);
    const buf_327 = createEmptyBuf(device, 8192);;
    const buf_328 = createWeightBuf(device, 16777216, state_dict['layers.14.feed_forward.w2.weight']);
    const buf_329 = createWeightBuf(device, 8192, state_dict['layers.14.feed_forward.w2.scale']);
    const buf_330 = createEmptyBuf(device, 8192);;
    const buf_331 = createWeightBuf(device, 8192, state_dict['layers.15.attention_norm.weight']);
    const buf_332 = createEmptyBuf(device, 2048);;
    const buf_333 = createWeightBuf(device, 1048576, state_dict['layers.15.attention.wk.weight']);
    const buf_334 = createWeightBuf(device, 2048, state_dict['layers.15.attention.wk.scale']);
    const buf_335 = createEmptyBuf(device, 2048);;
    const buf_336 = createWeightBuf(device, 1048576, state_dict['layers.15.attention.wv.weight']);
    const buf_337 = createWeightBuf(device, 2048, state_dict['layers.15.attention.wv.scale']);
    const buf_338 = createWeightBuf(device, 4194304, state_dict['layers.15.attention.cache_kv']);
    const buf_339 = createEmptyBuf(device, 4);;
    const buf_340 = createWeightBuf(device, 4194304, state_dict['layers.15.attention.wq.weight']);
    const buf_341 = createWeightBuf(device, 8192, state_dict['layers.15.attention.wq.scale']);
    const buf_342 = createEmptyBuf(device, 4);;
    const buf_343 = createEmptyBuf(device, 8);;
    const buf_344 = createWeightBuf(device, 4194304, state_dict['layers.15.attention.wo.weight']);
    const buf_345 = createWeightBuf(device, 8192, state_dict['layers.15.attention.wo.scale']);
    const buf_346 = createEmptyBuf(device, 4);;
    const buf_347 = createWeightBuf(device, 8192, state_dict['layers.15.ffn_norm.weight']);
    const buf_348 = createWeightBuf(device, 16777216, state_dict['layers.15.feed_forward.w3.weight']);
    const buf_349 = createWeightBuf(device, 32768, state_dict['layers.15.feed_forward.w3.scale']);
    const buf_350 = createWeightBuf(device, 16777216, state_dict['layers.15.feed_forward.w1.weight']);
    const buf_351 = createWeightBuf(device, 32768, state_dict['layers.15.feed_forward.w1.scale']);
    const buf_352 = createEmptyBuf(device, 8192);;
    const buf_353 = createWeightBuf(device, 16777216, state_dict['layers.15.feed_forward.w2.weight']);
    const buf_354 = createWeightBuf(device, 8192, state_dict['layers.15.feed_forward.w2.scale']);
    const buf_355 = createWeightBuf(device, 8192, state_dict['norm.weight']);
    const buf_356 = createEmptyBuf(device, 513024);;
    const buf_357 = createEmptyBuf(device, 1024);;
    const buf_358 = createEmptyBuf(device, 4);;
    const buf_359 = createEmptyBuf(device, 513024);;
    const buf_360 = createEmptyBuf(device, 513024);;
    const buf_361 = createEmptyBuf(device, 2004);;
    const buf_362 = createEmptyBuf(device, 1024);;
    const output0 = createEmptyBuf(device, 4);;
    const start_pos = createUniformBuf(device, 4);;

    const gpuWriteBuffer0 = device.createBuffer({size:input0.size, usage: GPUBufferUsage.COPY_SRC | GPUBufferUsage.MAP_WRITE });
    const gpuWriteBuffer1 = device.createBuffer({size:start_pos.size, usage: GPUBufferUsage.COPY_SRC | GPUBufferUsage.MAP_WRITE });

    const gpuReadBuffer0 = device.createBuffer({size:output0.size, usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ });

    const kernels = [r_4_256_32_501_4_4, r_1024_256_2, r_16_128, E_1024_2, r_512_256_8, r_512_256_8, E_2_64_8, r_2048_16_32_4, E_32_32_2, r_16_28start_pos2B129_64_2, r_16_28start_pos2B129_2, r_16_2_28start_pos2B129, E_8_28start_pos2B129_4n1, r_32_8_8_28start_pos2B129, r_2048_16_32_4n1, r_16_128, E_1024_2, r_8192_16_32_4, r_8192_16_32_4n1, r_2048_16_16_32, r_16_128, E_1024_2, r_512_256_8, r_512_256_8, E_2_64_8, r_2048_16_32_4, E_32_32_2, r_16_28start_pos2B129_64_2, r_16_28start_pos2B129_2, r_16_2_28start_pos2B129, E_8_28start_pos2B129_4n1, r_32_8_8_28start_pos2B129, r_2048_16_32_4n1, r_16_128, E_1024_2, r_8192_16_32_4, r_8192_16_32_4n1, r_2048_16_16_32, r_16_128, E_1024_2, r_512_256_8, r_512_256_8, E_2_64_8, r_2048_16_32_4, E_32_32_2, r_16_28start_pos2B129_64_2, r_16_28start_pos2B129_2, r_16_2_28start_pos2B129, E_8_28start_pos2B129_4n1, r_32_8_8_28start_pos2B129, r_2048_16_32_4n1, r_16_128, E_1024_2, r_8192_16_32_4, r_8192_16_32_4n1, r_2048_16_16_32, r_16_128, E_1024_2, r_512_256_8, r_512_256_8, E_2_64_8, r_2048_16_32_4, E_32_32_2, r_16_28start_pos2B129_64_2, r_16_28start_pos2B129_2, r_16_2_28start_pos2B129, E_8_28start_pos2B129_4n1, r_32_8_8_28start_pos2B129, r_2048_16_32_4n1, r_16_128, E_1024_2, r_8192_16_32_4, r_8192_16_32_4n1, r_2048_16_16_32, r_16_128, E_1024_2, r_512_256_8, r_512_256_8, E_2_64_8, r_2048_16_32_4, E_32_32_2, r_16_28start_pos2B129_64_2, r_16_28start_pos2B129_2, r_16_2_28start_pos2B129, E_8_28start_pos2B129_4n1, r_32_8_8_28start_pos2B129, r_2048_16_32_4n1, r_16_128, E_1024_2, r_8192_16_32_4, r_8192_16_32_4n1, r_2048_16_16_32, r_16_128, E_1024_2, r_512_256_8, r_512_256_8, E_2_64_8, r_2048_16_32_4, E_32_32_2, r_16_28start_pos2B129_64_2, r_16_28start_pos2B129_2, r_16_2_28start_pos2B129, E_8_28start_pos2B129_4n1, r_32_8_8_28start_pos2B129, r_2048_16_32_4n1, r_16_128, E_1024_2, r_8192_16_32_4, r_8192_16_32_4n1, r_2048_16_16_32, r_16_128, E_1024_2, r_512_256_8, r_512_256_8, E_2_64_8, r_2048_16_32_4, E_32_32_2, r_16_28start_pos2B129_64_2, r_16_28start_pos2B129_2, r_16_2_28start_pos2B129, E_8_28start_pos2B129_4n1, r_32_8_8_28start_pos2B129, r_2048_16_32_4n1, r_16_128, E_1024_2, r_8192_16_32_4, r_8192_16_32_4n1, r_2048_16_16_32, r_16_128, E_1024_2, r_512_256_8, r_512_256_8, E_2_64_8, r_2048_16_32_4, E_32_32_2, r_16_28start_pos2B129_64_2, r_16_28start_pos2B129_2, r_16_2_28start_pos2B129, E_8_28start_pos2B129_4n1, r_32_8_8_28start_pos2B129, r_2048_16_32_4n1, r_16_128, E_1024_2, r_8192_16_32_4, r_8192_16_32_4n1, r_2048_16_16_32, r_16_128, E_1024_2, r_512_256_8, r_512_256_8, E_2_64_8, r_2048_16_32_4, E_32_32_2, r_16_28start_pos2B129_64_2, r_16_28start_pos2B129_2, r_16_2_28start_pos2B129, E_8_28start_pos2B129_4n1, r_32_8_8_28start_pos2B129, r_2048_16_32_4n1, r_16_128, E_1024_2, r_8192_16_32_4, r_8192_16_32_4n1, r_2048_16_16_32, r_16_128, E_1024_2, r_512_256_8, r_512_256_8, E_2_64_8, r_2048_16_32_4, E_32_32_2, r_16_28start_pos2B129_64_2, r_16_28start_pos2B129_2, r_16_2_28start_pos2B129, E_8_28start_pos2B129_4n1, r_32_8_8_28start_pos2B129, r_2048_16_32_4n1, r_16_128, E_1024_2, r_8192_16_32_4, r_8192_16_32_4n1, r_2048_16_16_32, r_16_128, E_1024_2, r_512_256_8, r_512_256_8, E_2_64_8, r_2048_16_32_4, E_32_32_2, r_16_28start_pos2B129_64_2, r_16_28start_pos2B129_2, r_16_2_28start_pos2B129, E_8_28start_pos2B129_4n1, r_32_8_8_28start_pos2B129, r_2048_16_32_4n1, r_16_128, E_1024_2, r_8192_16_32_4, r_8192_16_32_4n1, r_2048_16_16_32, r_16_128, E_1024_2, r_512_256_8, r_512_256_8, E_2_64_8, r_2048_16_32_4, E_32_32_2, r_16_28start_pos2B129_64_2, r_16_28start_pos2B129_2, r_16_2_28start_pos2B129, E_8_28start_pos2B129_4n1, r_32_8_8_28start_pos2B129, r_2048_16_32_4n1, r_16_128, E_1024_2, r_8192_16_32_4, r_8192_16_32_4n1, r_2048_16_16_32, r_16_128, E_1024_2, r_512_256_8, r_512_256_8, E_2_64_8, r_2048_16_32_4, E_32_32_2, r_16_28start_pos2B129_64_2, r_16_28start_pos2B129_2, r_16_2_28start_pos2B129, E_8_28start_pos2B129_4n1, r_32_8_8_28start_pos2B129, r_2048_16_32_4n1, r_16_128, E_1024_2, r_8192_16_32_4, r_8192_16_32_4n1, r_2048_16_16_32, r_16_128, E_1024_2, r_512_256_8, r_512_256_8, E_2_64_8, r_2048_16_32_4, E_32_32_2, r_16_28start_pos2B129_64_2, r_16_28start_pos2B129_2, r_16_2_28start_pos2B129, E_8_28start_pos2B129_4n1, r_32_8_8_28start_pos2B129, r_2048_16_32_4n1, r_16_128, E_1024_2, r_8192_16_32_4, r_8192_16_32_4n1, r_2048_16_16_32, r_16_128, E_1024_2, r_512_256_8, r_512_256_8, E_2_64_8, r_2048_16_32_4, E_32_32_2, r_16_28start_pos2B129_64_2, r_16_28start_pos2B129_2, r_16_2_28start_pos2B129, E_8_28start_pos2B129_4n1, r_32_8_8_28start_pos2B129, r_2048_16_32_4n1, r_16_128, E_1024_2, r_8192_16_32_4, r_8192_16_32_4n1, r_2048_16_16_32, r_16_128, E_1024_2, r_512_256_8, r_512_256_8, E_2_64_8, E_n7, r_2048_16_32_4, E_n8, E_32_32_2, E_n9, r_16_28start_pos2B129_64_2, r_16_28start_pos2B129_2, r_16_2_28start_pos2B129, E_8_28start_pos2B129_4n1, r_32_8_8_28start_pos2B129, r_2048_16_32_4n1, r_16_128, E_1024_2, r_8192_16_32_4, r_8192_16_32_4n1, r_2048_16_16_32, r_16_128, E_1024_2, r_21376_2_16_8_3_4_4, r_256_501n3, r_64_4n6, r_256_501n4, r_64_4n7, E_64128_2, r_501_32_8_16_16, r_501_501n1, r_256_501n5, r_64_4n8];
    const pipelines = await Promise.all(kernels.map(async (name, i) => {
      return await device.createComputePipelineAsync({
          layout: device.createPipelineLayout({
              bindGroupLayouts: [layouts[i]],
          }),
          compute: {
              module: device.createShaderModule({
                  code: name,
              }),
              entryPoint: "main",
          },
      });
  }))

    return async (_input0,_start_pos) => {
        const commandEncoder = device.createCommandEncoder();
        await gpuWriteBuffer0.mapAsync(GPUMapMode.WRITE);
        new Int32Array(gpuWriteBuffer0.getMappedRange()).set(_input0);
        gpuWriteBuffer0.unmap();
        commandEncoder.copyBufferToBuffer(gpuWriteBuffer0, 0, input0, 0, gpuWriteBuffer0.size);
    await gpuWriteBuffer1.mapAsync(GPUMapMode.WRITE);
        new Int32Array(gpuWriteBuffer1.getMappedRange()).set(_start_pos);
        gpuWriteBuffer1.unmap();
        commandEncoder.copyBufferToBuffer(gpuWriteBuffer1, 0, start_pos, 0, gpuWriteBuffer1.size);
        addComputePass(device, commandEncoder, pipelines[0], layouts[0], infinityBuf, [buf_0, buf_1, input0, buf_2, buf_3], [256, 4, 1]);
        addComputePass(device, commandEncoder, pipelines[1], layouts[1], infinityBuf, [buf_4, buf_0], [1024, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[2], layouts[2], infinityBuf, [buf_5, buf_4], [1, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[3], layouts[3], infinityBuf, [buf_6, buf_4, buf_5, buf_7], [1024, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[4], layouts[4], infinityBuf, [buf_8, buf_6, buf_9, buf_10], [512, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[5], layouts[5], infinityBuf, [buf_11, buf_6, buf_12, buf_13], [512, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[6], layouts[6], infinityBuf, [buf_14, buf_8, buf_15, buf_11, start_pos], [64, 2, 1]);
        addComputePass(device, commandEncoder, pipelines[7], layouts[7], infinityBuf, [buf_16, buf_6, buf_17, buf_18], [2048, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[8], layouts[8], infinityBuf, [buf_19, buf_16, buf_15, start_pos], [32, 32, 1]);
        addComputePass(device, commandEncoder, pipelines[9], layouts[9], infinityBuf, [buf_20, buf_19, buf_14, start_pos], [_start_pos[0] + 1, 16, 1]);
        addComputePass(device, commandEncoder, pipelines[10], layouts[10], infinityBuf, [buf_21, buf_20, start_pos], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[11], layouts[11], infinityBuf, [buf_22, buf_20, buf_21, start_pos], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[12], layouts[12], infinityBuf, [buf_23, buf_20, buf_21, buf_22, start_pos], [_start_pos[0] + 1, 8, 1]);
        addComputePass(device, commandEncoder, pipelines[13], layouts[13], infinityBuf, [buf_16, buf_23, buf_14, start_pos], [8, 32, 1]);
        addComputePass(device, commandEncoder, pipelines[14], layouts[14], infinityBuf, [buf_19, buf_4, buf_16, buf_24, buf_25], [2048, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[15], layouts[15], infinityBuf, [buf_5, buf_19], [1, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[16], layouts[16], infinityBuf, [buf_16, buf_19, buf_5, buf_26], [1024, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[17], layouts[17], infinityBuf, [buf_27, buf_16, buf_28, buf_29], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[18], layouts[18], infinityBuf, [buf_30, buf_16, buf_31, buf_32, buf_27], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[19], layouts[19], infinityBuf, [buf_33, buf_19, buf_30, buf_34, buf_35], [2048, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[20], layouts[20], infinityBuf, [buf_5, buf_33], [1, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[21], layouts[21], infinityBuf, [buf_36, buf_33, buf_5, buf_37], [1024, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[22], layouts[22], infinityBuf, [buf_38, buf_36, buf_39, buf_40], [512, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[23], layouts[23], infinityBuf, [buf_41, buf_36, buf_42, buf_43], [512, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[24], layouts[24], infinityBuf, [buf_44, buf_38, buf_15, buf_41, start_pos], [64, 2, 1]);
        addComputePass(device, commandEncoder, pipelines[25], layouts[25], infinityBuf, [buf_19, buf_36, buf_45, buf_46], [2048, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[26], layouts[26], infinityBuf, [buf_16, buf_19, buf_15, start_pos], [32, 32, 1]);
        addComputePass(device, commandEncoder, pipelines[27], layouts[27], infinityBuf, [buf_20, buf_16, buf_44, start_pos], [_start_pos[0] + 1, 16, 1]);
        addComputePass(device, commandEncoder, pipelines[28], layouts[28], infinityBuf, [buf_21, buf_20, start_pos], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[29], layouts[29], infinityBuf, [buf_22, buf_20, buf_21, start_pos], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[30], layouts[30], infinityBuf, [buf_23, buf_20, buf_21, buf_22, start_pos], [_start_pos[0] + 1, 8, 1]);
        addComputePass(device, commandEncoder, pipelines[31], layouts[31], infinityBuf, [buf_19, buf_23, buf_44, start_pos], [8, 32, 1]);
        addComputePass(device, commandEncoder, pipelines[32], layouts[32], infinityBuf, [buf_16, buf_33, buf_19, buf_47, buf_48], [2048, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[33], layouts[33], infinityBuf, [buf_5, buf_16], [1, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[34], layouts[34], infinityBuf, [buf_19, buf_16, buf_5, buf_49], [1024, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[35], layouts[35], infinityBuf, [buf_27, buf_19, buf_50, buf_51], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[36], layouts[36], infinityBuf, [buf_30, buf_19, buf_52, buf_53, buf_27], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[37], layouts[37], infinityBuf, [buf_54, buf_16, buf_30, buf_55, buf_56], [2048, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[38], layouts[38], infinityBuf, [buf_5, buf_54], [1, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[39], layouts[39], infinityBuf, [buf_57, buf_54, buf_5, buf_58], [1024, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[40], layouts[40], infinityBuf, [buf_59, buf_57, buf_60, buf_61], [512, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[41], layouts[41], infinityBuf, [buf_62, buf_57, buf_63, buf_64], [512, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[42], layouts[42], infinityBuf, [buf_65, buf_59, buf_15, buf_62, start_pos], [64, 2, 1]);
        addComputePass(device, commandEncoder, pipelines[43], layouts[43], infinityBuf, [buf_16, buf_57, buf_66, buf_67], [2048, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[44], layouts[44], infinityBuf, [buf_19, buf_16, buf_15, start_pos], [32, 32, 1]);
        addComputePass(device, commandEncoder, pipelines[45], layouts[45], infinityBuf, [buf_20, buf_19, buf_65, start_pos], [_start_pos[0] + 1, 16, 1]);
        addComputePass(device, commandEncoder, pipelines[46], layouts[46], infinityBuf, [buf_21, buf_20, start_pos], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[47], layouts[47], infinityBuf, [buf_22, buf_20, buf_21, start_pos], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[48], layouts[48], infinityBuf, [buf_23, buf_20, buf_21, buf_22, start_pos], [_start_pos[0] + 1, 8, 1]);
        addComputePass(device, commandEncoder, pipelines[49], layouts[49], infinityBuf, [buf_16, buf_23, buf_65, start_pos], [8, 32, 1]);
        addComputePass(device, commandEncoder, pipelines[50], layouts[50], infinityBuf, [buf_19, buf_54, buf_16, buf_68, buf_69], [2048, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[51], layouts[51], infinityBuf, [buf_5, buf_19], [1, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[52], layouts[52], infinityBuf, [buf_16, buf_19, buf_5, buf_70], [1024, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[53], layouts[53], infinityBuf, [buf_27, buf_16, buf_71, buf_72], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[54], layouts[54], infinityBuf, [buf_30, buf_16, buf_73, buf_74, buf_27], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[55], layouts[55], infinityBuf, [buf_75, buf_19, buf_30, buf_76, buf_77], [2048, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[56], layouts[56], infinityBuf, [buf_5, buf_75], [1, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[57], layouts[57], infinityBuf, [buf_78, buf_75, buf_5, buf_79], [1024, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[58], layouts[58], infinityBuf, [buf_80, buf_78, buf_81, buf_82], [512, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[59], layouts[59], infinityBuf, [buf_83, buf_78, buf_84, buf_85], [512, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[60], layouts[60], infinityBuf, [buf_86, buf_80, buf_15, buf_83, start_pos], [64, 2, 1]);
        addComputePass(device, commandEncoder, pipelines[61], layouts[61], infinityBuf, [buf_19, buf_78, buf_87, buf_88], [2048, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[62], layouts[62], infinityBuf, [buf_16, buf_19, buf_15, start_pos], [32, 32, 1]);
        addComputePass(device, commandEncoder, pipelines[63], layouts[63], infinityBuf, [buf_20, buf_16, buf_86, start_pos], [_start_pos[0] + 1, 16, 1]);
        addComputePass(device, commandEncoder, pipelines[64], layouts[64], infinityBuf, [buf_21, buf_20, start_pos], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[65], layouts[65], infinityBuf, [buf_22, buf_20, buf_21, start_pos], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[66], layouts[66], infinityBuf, [buf_23, buf_20, buf_21, buf_22, start_pos], [_start_pos[0] + 1, 8, 1]);
        addComputePass(device, commandEncoder, pipelines[67], layouts[67], infinityBuf, [buf_19, buf_23, buf_86, start_pos], [8, 32, 1]);
        addComputePass(device, commandEncoder, pipelines[68], layouts[68], infinityBuf, [buf_16, buf_75, buf_19, buf_89, buf_90], [2048, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[69], layouts[69], infinityBuf, [buf_5, buf_16], [1, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[70], layouts[70], infinityBuf, [buf_19, buf_16, buf_5, buf_91], [1024, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[71], layouts[71], infinityBuf, [buf_27, buf_19, buf_92, buf_93], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[72], layouts[72], infinityBuf, [buf_30, buf_19, buf_94, buf_95, buf_27], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[73], layouts[73], infinityBuf, [buf_96, buf_16, buf_30, buf_97, buf_98], [2048, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[74], layouts[74], infinityBuf, [buf_5, buf_96], [1, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[75], layouts[75], infinityBuf, [buf_99, buf_96, buf_5, buf_100], [1024, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[76], layouts[76], infinityBuf, [buf_101, buf_99, buf_102, buf_103], [512, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[77], layouts[77], infinityBuf, [buf_104, buf_99, buf_105, buf_106], [512, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[78], layouts[78], infinityBuf, [buf_107, buf_101, buf_15, buf_104, start_pos], [64, 2, 1]);
        addComputePass(device, commandEncoder, pipelines[79], layouts[79], infinityBuf, [buf_16, buf_99, buf_108, buf_109], [2048, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[80], layouts[80], infinityBuf, [buf_19, buf_16, buf_15, start_pos], [32, 32, 1]);
        addComputePass(device, commandEncoder, pipelines[81], layouts[81], infinityBuf, [buf_20, buf_19, buf_107, start_pos], [_start_pos[0] + 1, 16, 1]);
        addComputePass(device, commandEncoder, pipelines[82], layouts[82], infinityBuf, [buf_21, buf_20, start_pos], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[83], layouts[83], infinityBuf, [buf_22, buf_20, buf_21, start_pos], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[84], layouts[84], infinityBuf, [buf_23, buf_20, buf_21, buf_22, start_pos], [_start_pos[0] + 1, 8, 1]);
        addComputePass(device, commandEncoder, pipelines[85], layouts[85], infinityBuf, [buf_16, buf_23, buf_107, start_pos], [8, 32, 1]);
        addComputePass(device, commandEncoder, pipelines[86], layouts[86], infinityBuf, [buf_19, buf_96, buf_16, buf_110, buf_111], [2048, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[87], layouts[87], infinityBuf, [buf_5, buf_19], [1, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[88], layouts[88], infinityBuf, [buf_16, buf_19, buf_5, buf_112], [1024, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[89], layouts[89], infinityBuf, [buf_27, buf_16, buf_113, buf_114], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[90], layouts[90], infinityBuf, [buf_30, buf_16, buf_115, buf_116, buf_27], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[91], layouts[91], infinityBuf, [buf_117, buf_19, buf_30, buf_118, buf_119], [2048, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[92], layouts[92], infinityBuf, [buf_5, buf_117], [1, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[93], layouts[93], infinityBuf, [buf_120, buf_117, buf_5, buf_121], [1024, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[94], layouts[94], infinityBuf, [buf_122, buf_120, buf_123, buf_124], [512, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[95], layouts[95], infinityBuf, [buf_125, buf_120, buf_126, buf_127], [512, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[96], layouts[96], infinityBuf, [buf_128, buf_122, buf_15, buf_125, start_pos], [64, 2, 1]);
        addComputePass(device, commandEncoder, pipelines[97], layouts[97], infinityBuf, [buf_19, buf_120, buf_129, buf_130], [2048, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[98], layouts[98], infinityBuf, [buf_16, buf_19, buf_15, start_pos], [32, 32, 1]);
        addComputePass(device, commandEncoder, pipelines[99], layouts[99], infinityBuf, [buf_20, buf_16, buf_128, start_pos], [_start_pos[0] + 1, 16, 1]);
        addComputePass(device, commandEncoder, pipelines[100], layouts[100], infinityBuf, [buf_21, buf_20, start_pos], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[101], layouts[101], infinityBuf, [buf_22, buf_20, buf_21, start_pos], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[102], layouts[102], infinityBuf, [buf_23, buf_20, buf_21, buf_22, start_pos], [_start_pos[0] + 1, 8, 1]);
        addComputePass(device, commandEncoder, pipelines[103], layouts[103], infinityBuf, [buf_19, buf_23, buf_128, start_pos], [8, 32, 1]);
        addComputePass(device, commandEncoder, pipelines[104], layouts[104], infinityBuf, [buf_16, buf_117, buf_19, buf_131, buf_132], [2048, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[105], layouts[105], infinityBuf, [buf_5, buf_16], [1, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[106], layouts[106], infinityBuf, [buf_19, buf_16, buf_5, buf_133], [1024, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[107], layouts[107], infinityBuf, [buf_27, buf_19, buf_134, buf_135], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[108], layouts[108], infinityBuf, [buf_30, buf_19, buf_136, buf_137, buf_27], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[109], layouts[109], infinityBuf, [buf_138, buf_16, buf_30, buf_139, buf_140], [2048, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[110], layouts[110], infinityBuf, [buf_5, buf_138], [1, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[111], layouts[111], infinityBuf, [buf_141, buf_138, buf_5, buf_142], [1024, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[112], layouts[112], infinityBuf, [buf_143, buf_141, buf_144, buf_145], [512, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[113], layouts[113], infinityBuf, [buf_146, buf_141, buf_147, buf_148], [512, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[114], layouts[114], infinityBuf, [buf_149, buf_143, buf_15, buf_146, start_pos], [64, 2, 1]);
        addComputePass(device, commandEncoder, pipelines[115], layouts[115], infinityBuf, [buf_16, buf_141, buf_150, buf_151], [2048, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[116], layouts[116], infinityBuf, [buf_19, buf_16, buf_15, start_pos], [32, 32, 1]);
        addComputePass(device, commandEncoder, pipelines[117], layouts[117], infinityBuf, [buf_20, buf_19, buf_149, start_pos], [_start_pos[0] + 1, 16, 1]);
        addComputePass(device, commandEncoder, pipelines[118], layouts[118], infinityBuf, [buf_21, buf_20, start_pos], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[119], layouts[119], infinityBuf, [buf_22, buf_20, buf_21, start_pos], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[120], layouts[120], infinityBuf, [buf_23, buf_20, buf_21, buf_22, start_pos], [_start_pos[0] + 1, 8, 1]);
        addComputePass(device, commandEncoder, pipelines[121], layouts[121], infinityBuf, [buf_16, buf_23, buf_149, start_pos], [8, 32, 1]);
        addComputePass(device, commandEncoder, pipelines[122], layouts[122], infinityBuf, [buf_19, buf_138, buf_16, buf_152, buf_153], [2048, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[123], layouts[123], infinityBuf, [buf_5, buf_19], [1, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[124], layouts[124], infinityBuf, [buf_16, buf_19, buf_5, buf_154], [1024, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[125], layouts[125], infinityBuf, [buf_27, buf_16, buf_155, buf_156], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[126], layouts[126], infinityBuf, [buf_30, buf_16, buf_157, buf_158, buf_27], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[127], layouts[127], infinityBuf, [buf_159, buf_19, buf_30, buf_160, buf_161], [2048, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[128], layouts[128], infinityBuf, [buf_5, buf_159], [1, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[129], layouts[129], infinityBuf, [buf_162, buf_159, buf_5, buf_163], [1024, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[130], layouts[130], infinityBuf, [buf_164, buf_162, buf_165, buf_166], [512, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[131], layouts[131], infinityBuf, [buf_167, buf_162, buf_168, buf_169], [512, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[132], layouts[132], infinityBuf, [buf_170, buf_164, buf_15, buf_167, start_pos], [64, 2, 1]);
        addComputePass(device, commandEncoder, pipelines[133], layouts[133], infinityBuf, [buf_19, buf_162, buf_171, buf_172], [2048, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[134], layouts[134], infinityBuf, [buf_16, buf_19, buf_15, start_pos], [32, 32, 1]);
        addComputePass(device, commandEncoder, pipelines[135], layouts[135], infinityBuf, [buf_20, buf_16, buf_170, start_pos], [_start_pos[0] + 1, 16, 1]);
        addComputePass(device, commandEncoder, pipelines[136], layouts[136], infinityBuf, [buf_21, buf_20, start_pos], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[137], layouts[137], infinityBuf, [buf_22, buf_20, buf_21, start_pos], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[138], layouts[138], infinityBuf, [buf_23, buf_20, buf_21, buf_22, start_pos], [_start_pos[0] + 1, 8, 1]);
        addComputePass(device, commandEncoder, pipelines[139], layouts[139], infinityBuf, [buf_19, buf_23, buf_170, start_pos], [8, 32, 1]);
        addComputePass(device, commandEncoder, pipelines[140], layouts[140], infinityBuf, [buf_16, buf_159, buf_19, buf_173, buf_174], [2048, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[141], layouts[141], infinityBuf, [buf_5, buf_16], [1, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[142], layouts[142], infinityBuf, [buf_19, buf_16, buf_5, buf_175], [1024, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[143], layouts[143], infinityBuf, [buf_27, buf_19, buf_176, buf_177], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[144], layouts[144], infinityBuf, [buf_30, buf_19, buf_178, buf_179, buf_27], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[145], layouts[145], infinityBuf, [buf_180, buf_16, buf_30, buf_181, buf_182], [2048, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[146], layouts[146], infinityBuf, [buf_5, buf_180], [1, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[147], layouts[147], infinityBuf, [buf_183, buf_180, buf_5, buf_184], [1024, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[148], layouts[148], infinityBuf, [buf_185, buf_183, buf_186, buf_187], [512, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[149], layouts[149], infinityBuf, [buf_188, buf_183, buf_189, buf_190], [512, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[150], layouts[150], infinityBuf, [buf_191, buf_185, buf_15, buf_188, start_pos], [64, 2, 1]);
        addComputePass(device, commandEncoder, pipelines[151], layouts[151], infinityBuf, [buf_16, buf_183, buf_192, buf_193], [2048, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[152], layouts[152], infinityBuf, [buf_19, buf_16, buf_15, start_pos], [32, 32, 1]);
        addComputePass(device, commandEncoder, pipelines[153], layouts[153], infinityBuf, [buf_20, buf_19, buf_191, start_pos], [_start_pos[0] + 1, 16, 1]);
        addComputePass(device, commandEncoder, pipelines[154], layouts[154], infinityBuf, [buf_21, buf_20, start_pos], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[155], layouts[155], infinityBuf, [buf_22, buf_20, buf_21, start_pos], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[156], layouts[156], infinityBuf, [buf_23, buf_20, buf_21, buf_22, start_pos], [_start_pos[0] + 1, 8, 1]);
        addComputePass(device, commandEncoder, pipelines[157], layouts[157], infinityBuf, [buf_16, buf_23, buf_191, start_pos], [8, 32, 1]);
        addComputePass(device, commandEncoder, pipelines[158], layouts[158], infinityBuf, [buf_19, buf_180, buf_16, buf_194, buf_195], [2048, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[159], layouts[159], infinityBuf, [buf_5, buf_19], [1, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[160], layouts[160], infinityBuf, [buf_16, buf_19, buf_5, buf_196], [1024, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[161], layouts[161], infinityBuf, [buf_27, buf_16, buf_197, buf_198], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[162], layouts[162], infinityBuf, [buf_30, buf_16, buf_199, buf_200, buf_27], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[163], layouts[163], infinityBuf, [buf_201, buf_19, buf_30, buf_202, buf_203], [2048, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[164], layouts[164], infinityBuf, [buf_5, buf_201], [1, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[165], layouts[165], infinityBuf, [buf_204, buf_201, buf_5, buf_205], [1024, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[166], layouts[166], infinityBuf, [buf_206, buf_204, buf_207, buf_208], [512, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[167], layouts[167], infinityBuf, [buf_209, buf_204, buf_210, buf_211], [512, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[168], layouts[168], infinityBuf, [buf_212, buf_206, buf_15, buf_209, start_pos], [64, 2, 1]);
        addComputePass(device, commandEncoder, pipelines[169], layouts[169], infinityBuf, [buf_19, buf_204, buf_213, buf_214], [2048, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[170], layouts[170], infinityBuf, [buf_16, buf_19, buf_15, start_pos], [32, 32, 1]);
        addComputePass(device, commandEncoder, pipelines[171], layouts[171], infinityBuf, [buf_20, buf_16, buf_212, start_pos], [_start_pos[0] + 1, 16, 1]);
        addComputePass(device, commandEncoder, pipelines[172], layouts[172], infinityBuf, [buf_21, buf_20, start_pos], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[173], layouts[173], infinityBuf, [buf_22, buf_20, buf_21, start_pos], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[174], layouts[174], infinityBuf, [buf_23, buf_20, buf_21, buf_22, start_pos], [_start_pos[0] + 1, 8, 1]);
        addComputePass(device, commandEncoder, pipelines[175], layouts[175], infinityBuf, [buf_19, buf_23, buf_212, start_pos], [8, 32, 1]);
        addComputePass(device, commandEncoder, pipelines[176], layouts[176], infinityBuf, [buf_16, buf_201, buf_19, buf_215, buf_216], [2048, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[177], layouts[177], infinityBuf, [buf_5, buf_16], [1, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[178], layouts[178], infinityBuf, [buf_19, buf_16, buf_5, buf_217], [1024, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[179], layouts[179], infinityBuf, [buf_27, buf_19, buf_218, buf_219], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[180], layouts[180], infinityBuf, [buf_30, buf_19, buf_220, buf_221, buf_27], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[181], layouts[181], infinityBuf, [buf_222, buf_16, buf_30, buf_223, buf_224], [2048, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[182], layouts[182], infinityBuf, [buf_5, buf_222], [1, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[183], layouts[183], infinityBuf, [buf_225, buf_222, buf_5, buf_226], [1024, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[184], layouts[184], infinityBuf, [buf_227, buf_225, buf_228, buf_229], [512, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[185], layouts[185], infinityBuf, [buf_230, buf_225, buf_231, buf_232], [512, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[186], layouts[186], infinityBuf, [buf_233, buf_227, buf_15, buf_230, start_pos], [64, 2, 1]);
        addComputePass(device, commandEncoder, pipelines[187], layouts[187], infinityBuf, [buf_16, buf_225, buf_234, buf_235], [2048, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[188], layouts[188], infinityBuf, [buf_19, buf_16, buf_15, start_pos], [32, 32, 1]);
        addComputePass(device, commandEncoder, pipelines[189], layouts[189], infinityBuf, [buf_20, buf_19, buf_233, start_pos], [_start_pos[0] + 1, 16, 1]);
        addComputePass(device, commandEncoder, pipelines[190], layouts[190], infinityBuf, [buf_21, buf_20, start_pos], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[191], layouts[191], infinityBuf, [buf_22, buf_20, buf_21, start_pos], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[192], layouts[192], infinityBuf, [buf_23, buf_20, buf_21, buf_22, start_pos], [_start_pos[0] + 1, 8, 1]);
        addComputePass(device, commandEncoder, pipelines[193], layouts[193], infinityBuf, [buf_16, buf_23, buf_233, start_pos], [8, 32, 1]);
        addComputePass(device, commandEncoder, pipelines[194], layouts[194], infinityBuf, [buf_19, buf_222, buf_16, buf_236, buf_237], [2048, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[195], layouts[195], infinityBuf, [buf_5, buf_19], [1, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[196], layouts[196], infinityBuf, [buf_16, buf_19, buf_5, buf_238], [1024, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[197], layouts[197], infinityBuf, [buf_27, buf_16, buf_239, buf_240], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[198], layouts[198], infinityBuf, [buf_30, buf_16, buf_241, buf_242, buf_27], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[199], layouts[199], infinityBuf, [buf_243, buf_19, buf_30, buf_244, buf_245], [2048, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[200], layouts[200], infinityBuf, [buf_5, buf_243], [1, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[201], layouts[201], infinityBuf, [buf_246, buf_243, buf_5, buf_247], [1024, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[202], layouts[202], infinityBuf, [buf_248, buf_246, buf_249, buf_250], [512, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[203], layouts[203], infinityBuf, [buf_251, buf_246, buf_252, buf_253], [512, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[204], layouts[204], infinityBuf, [buf_254, buf_248, buf_15, buf_251, start_pos], [64, 2, 1]);
        addComputePass(device, commandEncoder, pipelines[205], layouts[205], infinityBuf, [buf_19, buf_246, buf_255, buf_256], [2048, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[206], layouts[206], infinityBuf, [buf_16, buf_19, buf_15, start_pos], [32, 32, 1]);
        addComputePass(device, commandEncoder, pipelines[207], layouts[207], infinityBuf, [buf_20, buf_16, buf_254, start_pos], [_start_pos[0] + 1, 16, 1]);
        addComputePass(device, commandEncoder, pipelines[208], layouts[208], infinityBuf, [buf_21, buf_20, start_pos], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[209], layouts[209], infinityBuf, [buf_22, buf_20, buf_21, start_pos], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[210], layouts[210], infinityBuf, [buf_23, buf_20, buf_21, buf_22, start_pos], [_start_pos[0] + 1, 8, 1]);
        addComputePass(device, commandEncoder, pipelines[211], layouts[211], infinityBuf, [buf_19, buf_23, buf_254, start_pos], [8, 32, 1]);
        addComputePass(device, commandEncoder, pipelines[212], layouts[212], infinityBuf, [buf_16, buf_243, buf_19, buf_257, buf_258], [2048, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[213], layouts[213], infinityBuf, [buf_5, buf_16], [1, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[214], layouts[214], infinityBuf, [buf_19, buf_16, buf_5, buf_259], [1024, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[215], layouts[215], infinityBuf, [buf_27, buf_19, buf_260, buf_261], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[216], layouts[216], infinityBuf, [buf_30, buf_19, buf_262, buf_263, buf_27], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[217], layouts[217], infinityBuf, [buf_264, buf_16, buf_30, buf_265, buf_266], [2048, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[218], layouts[218], infinityBuf, [buf_5, buf_264], [1, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[219], layouts[219], infinityBuf, [buf_267, buf_264, buf_5, buf_268], [1024, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[220], layouts[220], infinityBuf, [buf_269, buf_267, buf_270, buf_271], [512, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[221], layouts[221], infinityBuf, [buf_272, buf_267, buf_273, buf_274], [512, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[222], layouts[222], infinityBuf, [buf_275, buf_269, buf_15, buf_272, start_pos], [64, 2, 1]);
        addComputePass(device, commandEncoder, pipelines[223], layouts[223], infinityBuf, [buf_16, buf_267, buf_276, buf_277], [2048, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[224], layouts[224], infinityBuf, [buf_19, buf_16, buf_15, start_pos], [32, 32, 1]);
        addComputePass(device, commandEncoder, pipelines[225], layouts[225], infinityBuf, [buf_20, buf_19, buf_275, start_pos], [_start_pos[0] + 1, 16, 1]);
        addComputePass(device, commandEncoder, pipelines[226], layouts[226], infinityBuf, [buf_21, buf_20, start_pos], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[227], layouts[227], infinityBuf, [buf_22, buf_20, buf_21, start_pos], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[228], layouts[228], infinityBuf, [buf_23, buf_20, buf_21, buf_22, start_pos], [_start_pos[0] + 1, 8, 1]);
        addComputePass(device, commandEncoder, pipelines[229], layouts[229], infinityBuf, [buf_16, buf_23, buf_275, start_pos], [8, 32, 1]);
        addComputePass(device, commandEncoder, pipelines[230], layouts[230], infinityBuf, [buf_19, buf_264, buf_16, buf_278, buf_279], [2048, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[231], layouts[231], infinityBuf, [buf_5, buf_19], [1, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[232], layouts[232], infinityBuf, [buf_16, buf_19, buf_5, buf_280], [1024, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[233], layouts[233], infinityBuf, [buf_27, buf_16, buf_281, buf_282], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[234], layouts[234], infinityBuf, [buf_30, buf_16, buf_283, buf_284, buf_27], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[235], layouts[235], infinityBuf, [buf_285, buf_19, buf_30, buf_286, buf_287], [2048, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[236], layouts[236], infinityBuf, [buf_5, buf_285], [1, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[237], layouts[237], infinityBuf, [buf_288, buf_285, buf_5, buf_289], [1024, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[238], layouts[238], infinityBuf, [buf_290, buf_288, buf_291, buf_292], [512, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[239], layouts[239], infinityBuf, [buf_293, buf_288, buf_294, buf_295], [512, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[240], layouts[240], infinityBuf, [buf_296, buf_290, buf_15, buf_293, start_pos], [64, 2, 1]);
        addComputePass(device, commandEncoder, pipelines[241], layouts[241], infinityBuf, [buf_19, buf_288, buf_297, buf_298], [2048, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[242], layouts[242], infinityBuf, [buf_16, buf_19, buf_15, start_pos], [32, 32, 1]);
        addComputePass(device, commandEncoder, pipelines[243], layouts[243], infinityBuf, [buf_20, buf_16, buf_296, start_pos], [_start_pos[0] + 1, 16, 1]);
        addComputePass(device, commandEncoder, pipelines[244], layouts[244], infinityBuf, [buf_21, buf_20, start_pos], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[245], layouts[245], infinityBuf, [buf_22, buf_20, buf_21, start_pos], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[246], layouts[246], infinityBuf, [buf_23, buf_20, buf_21, buf_22, start_pos], [_start_pos[0] + 1, 8, 1]);
        addComputePass(device, commandEncoder, pipelines[247], layouts[247], infinityBuf, [buf_19, buf_23, buf_296, start_pos], [8, 32, 1]);
        addComputePass(device, commandEncoder, pipelines[248], layouts[248], infinityBuf, [buf_16, buf_285, buf_19, buf_299, buf_300], [2048, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[249], layouts[249], infinityBuf, [buf_5, buf_16], [1, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[250], layouts[250], infinityBuf, [buf_19, buf_16, buf_5, buf_301], [1024, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[251], layouts[251], infinityBuf, [buf_27, buf_19, buf_302, buf_303], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[252], layouts[252], infinityBuf, [buf_30, buf_19, buf_304, buf_305, buf_27], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[253], layouts[253], infinityBuf, [buf_306, buf_16, buf_30, buf_307, buf_308], [2048, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[254], layouts[254], infinityBuf, [buf_5, buf_306], [1, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[255], layouts[255], infinityBuf, [buf_309, buf_306, buf_5, buf_310], [1024, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[256], layouts[256], infinityBuf, [buf_311, buf_309, buf_312, buf_313], [512, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[257], layouts[257], infinityBuf, [buf_314, buf_309, buf_315, buf_316], [512, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[258], layouts[258], infinityBuf, [buf_317, buf_311, buf_15, buf_314, start_pos], [64, 2, 1]);
        addComputePass(device, commandEncoder, pipelines[259], layouts[259], infinityBuf, [buf_16, buf_309, buf_318, buf_319], [2048, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[260], layouts[260], infinityBuf, [buf_19, buf_16, buf_15, start_pos], [32, 32, 1]);
        addComputePass(device, commandEncoder, pipelines[261], layouts[261], infinityBuf, [buf_20, buf_19, buf_317, start_pos], [_start_pos[0] + 1, 16, 1]);
        addComputePass(device, commandEncoder, pipelines[262], layouts[262], infinityBuf, [buf_21, buf_20, start_pos], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[263], layouts[263], infinityBuf, [buf_22, buf_20, buf_21, start_pos], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[264], layouts[264], infinityBuf, [buf_23, buf_20, buf_21, buf_22, start_pos], [_start_pos[0] + 1, 8, 1]);
        addComputePass(device, commandEncoder, pipelines[265], layouts[265], infinityBuf, [buf_16, buf_23, buf_317, start_pos], [8, 32, 1]);
        addComputePass(device, commandEncoder, pipelines[266], layouts[266], infinityBuf, [buf_19, buf_306, buf_16, buf_320, buf_321], [2048, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[267], layouts[267], infinityBuf, [buf_5, buf_19], [1, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[268], layouts[268], infinityBuf, [buf_16, buf_19, buf_5, buf_322], [1024, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[269], layouts[269], infinityBuf, [buf_27, buf_16, buf_323, buf_324], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[270], layouts[270], infinityBuf, [buf_30, buf_16, buf_325, buf_326, buf_27], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[271], layouts[271], infinityBuf, [buf_327, buf_19, buf_30, buf_328, buf_329], [2048, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[272], layouts[272], infinityBuf, [buf_5, buf_327], [1, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[273], layouts[273], infinityBuf, [buf_330, buf_327, buf_5, buf_331], [1024, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[274], layouts[274], infinityBuf, [buf_332, buf_330, buf_333, buf_334], [512, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[275], layouts[275], infinityBuf, [buf_335, buf_330, buf_336, buf_337], [512, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[276], layouts[276], infinityBuf, [buf_338, buf_332, buf_15, buf_335, start_pos], [64, 2, 1]);
        addComputePass(device, commandEncoder, pipelines[277], layouts[277], infinityBuf, [buf_339], [1, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[278], layouts[278], infinityBuf, [buf_19, buf_330, buf_340, buf_341], [2048, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[279], layouts[279], infinityBuf, [buf_342, buf_339, buf_343], [1, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[280], layouts[280], infinityBuf, [buf_16, buf_19, buf_15, start_pos], [32, 32, 1]);
        addComputePass(device, commandEncoder, pipelines[281], layouts[281], infinityBuf, [buf_5, buf_339, buf_343], [1, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[282], layouts[282], infinityBuf, [buf_20, buf_16, buf_338, start_pos], [_start_pos[0] + 1, 16, 1]);
        addComputePass(device, commandEncoder, pipelines[283], layouts[283], infinityBuf, [buf_21, buf_20, start_pos], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[284], layouts[284], infinityBuf, [buf_22, buf_20, buf_21, start_pos], [16, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[285], layouts[285], infinityBuf, [buf_23, buf_20, buf_21, buf_22, start_pos], [_start_pos[0] + 1, 8, 1]);
        addComputePass(device, commandEncoder, pipelines[286], layouts[286], infinityBuf, [buf_19, buf_23, buf_338, start_pos], [8, 32, 1]);
        addComputePass(device, commandEncoder, pipelines[287], layouts[287], infinityBuf, [buf_16, buf_327, buf_19, buf_344, buf_345], [2048, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[288], layouts[288], infinityBuf, [buf_346, buf_16], [1, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[289], layouts[289], infinityBuf, [buf_19, buf_16, buf_346, buf_347], [1024, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[290], layouts[290], infinityBuf, [buf_27, buf_19, buf_348, buf_349], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[291], layouts[291], infinityBuf, [buf_30, buf_19, buf_350, buf_351, buf_27], [8192, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[292], layouts[292], infinityBuf, [buf_352, buf_16, buf_30, buf_353, buf_354], [2048, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[293], layouts[293], infinityBuf, [buf_346, buf_352], [1, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[294], layouts[294], infinityBuf, [buf_16, buf_352, buf_346, buf_355], [1024, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[295], layouts[295], infinityBuf, [buf_356, buf_16, buf_2, buf_3], [21376, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[296], layouts[296], infinityBuf, [buf_357, buf_356], [256, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[297], layouts[297], infinityBuf, [buf_346, buf_357], [1, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[298], layouts[298], infinityBuf, [buf_357, buf_356, buf_346], [256, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[299], layouts[299], infinityBuf, [buf_358, buf_357], [1, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[300], layouts[300], infinityBuf, [buf_359, buf_356, buf_346, buf_358], [64128, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[301], layouts[301], infinityBuf, [buf_360, buf_359], [32, 501, 1]);
        addComputePass(device, commandEncoder, pipelines[302], layouts[302], infinityBuf, [buf_361, buf_360], [501, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[303], layouts[303], infinityBuf, [buf_362, buf_5, buf_360, buf_361], [256, 1, 1]);
        addComputePass(device, commandEncoder, pipelines[304], layouts[304], infinityBuf, [output0, buf_362], [1, 1, 1]);
        commandEncoder.copyBufferToBuffer(output0, 0, gpuReadBuffer0, 0, output0.size);
        const gpuCommands = commandEncoder.finish();
        device.queue.submit([gpuCommands]);

        await gpuReadBuffer0.mapAsync(GPUMapMode.READ);
        const resultBuffer0 = new Int32Array(gpuReadBuffer0.size/4);
        resultBuffer0.set(new Int32Array(gpuReadBuffer0.getMappedRange()));
        gpuReadBuffer0.unmap();
        return [resultBuffer0];
    }
}
const load = async (device, weight_path) => { return await fetch(weight_path).then(x => x.arrayBuffer()).then(x => setupNet(device, new Uint8Array(x))); }
return { load, setupNet };
})();
export default transformer;
