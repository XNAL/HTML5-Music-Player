define([
], function() {
	'use strict';

	let list = [
		{
			"url": "http://dl.stream.qqmusic.qq.com/C4000010ibBn4bYFTk.m4a?vkey=7369BC1B33DB180B8A26910AC2CED2C4A5C7E7FED757E24A41EA6EC259F16E90CB9C137D23E5E0EBD5AF15024A18A19229D64AC99D445086&guid=2393653650&uin=772528797&fromtag=66",
			"singername": "周杰伦",
			"songname": "夜的第七章",
			"albumpic": "https://y.gtimg.cn/music/photo_new/T002R300x300M000002jLGWe16Tf1H.jpg?max_age=2592000"
		},
		{
			"url": "http://dl.stream.qqmusic.qq.com/C400000PLHrM2luXiz.m4a?vkey=5CC4012A9183CF63923C67BCA3CEF82D87278092885A29E6D4DED2A48A6702FB6623D3828C86BDF2DE101E5BC0A0A41EBB44C41E323C2B0A&guid=2393653650&uin=772528797&fromtag=66",
			"singername": "李健",
			"songname": "贝加尔湖畔",
			"albumpic": "https://y.gtimg.cn/music/photo_new/T002R300x300M000002g0JpA4aQ6bZ.jpg?max_age=2592000"
		},
		{
			"url": "http://dl.stream.qqmusic.qq.com/C400003TgAeV2YzOCj.m4a?vkey=26E371561BF107E132EE0DA661CB89849CC43BEE3179FFCAA964283C7F5F42719C675C9B64375D0B0DCC981E2E6FA9E238D35DEA76C9AE8B&guid=2393653650&uin=772528797&fromtag=66",
			"singername": "陈奕迅",
			"songname": "斯德哥尔摩情人",
			"albumpic": "https://y.gtimg.cn/music/photo_new/T002R300x300M000004WkGkE30RCep.jpg?max_age=2592000"
		},
		{
			"url": "http://dl.stream.qqmusic.qq.com/C400004XcdPX08dOus.m4a?vkey=2A40EF6D89FD0ACF58A7CE09F94E5D658ABAA04C4693546C2189ABCBEDF3EBAB4ED4CB0C50B3941483BD757FBB39A31D8C61CF0C746D3C1E&guid=2393653650&uin=772528797&fromtag=66",
			"singername": "许巍",
			"songname": "曾经的你",
			"albumpic": "https://y.gtimg.cn/music/photo_new/T002R300x300M000000lrk6m1fk7tl.jpg?max_age=2592000"
		},
		{
			"url": "http://dl.stream.qqmusic.qq.com/C400004295Et37taLD.m4a?vkey=AF4FE126DBEDEE1605EBAAB3CEE2B90B992D5B8E0650032C6BC32969A627984DE5EEEABF0470E41C39D74CA23053EF6D2985E685C834384A&guid=2393653650&uin=772528797&fromtag=66",
			"singername": "林俊杰",
			"songname": "可惜没有如果",
			"albumpic": "https://y.gtimg.cn/music/photo_new/T002R300x300M000001IV22P1RDX7p.jpg?max_age=2592000"
		},
		{
			"url": "http://dl.stream.qqmusic.qq.com/C400002BWGZQ2UKjKn.m4a?vkey=828FD954B1C87E0B91519530B0351B87A64253754A389B4D0126FB3AA510058E23FBA3AC5F40D824D34B2A79FED37AC8B94DE1BDAD325F0A&guid=2393653650&uin=772528797&fromtag=66",
			"singername": "薛之谦",
			"songname": "你还要我怎样",
			"albumpic": "https://y.gtimg.cn/music/photo_new/T002R300x300M000000QgFcm0v8WaF.jpg?max_age=2592000"
		},
		{
			"url": "http://dl.stream.qqmusic.qq.com/C400003jX9iw0DCQY3.m4a?vkey=49FCA060A48BB6831D424E431E39D0645BD2C87AC6286C3C43A95CC620D2A8B6D91B479E27D2FAA48374DF9F00C9F8C22B6F92E626A28EAD&guid=2393653650&uin=772528797&fromtag=66",
			"singername": "李玉刚",
			"songname": "刚好遇见你",
			"albumpic": "https://y.gtimg.cn/music/photo_new/T002R300x300M000002qBBpu2q0vL3.jpg?max_age=2592000"
		},
		{
			"url": "http://dl.stream.qqmusic.qq.com/C400002Yzfab3R9lMM.m4a?vkey=C28BCA7498D4CB3E2C927B701DFCA2BF290DDC997838C9DF7B508EC27B027E61A760E3962CED5BA73D1753C7C8F145E8A6E2B5A791D37DD3&guid=2393653650&uin=772528797&fromtag=66",
			"singername": "陈鸿宇",
			"songname": "理想三旬",
			"albumpic": "https://y.gtimg.cn/music/photo_new/T002R300x300M000002kvhDj0nU7Qo.jpg?max_age=2592000"
		},
		{
			"url": "http://dl.stream.qqmusic.qq.com/C400003OUlho2HcRHC.m4a?vkey=2A3F4917EE1748DBC3E1E6C32EC607ABDE145C24A0EB429592FF7BC072FE1E7DFAF6EEDCF51F8D7E454A7E33629B299EA0755DD689813640&guid=2393653650&uin=772528797&fromtag=66",
			"singername": "周杰伦",
			"songname": "告白气球",
			"albumpic": "https://y.gtimg.cn/music/photo_new/T002R300x300M000003RMaRI1iFoYd.jpg?max_age=2592000"
		},
		{
			"url": "http://dl.stream.qqmusic.qq.com/C400000jF0b70x9gDf.m4a?vkey=846F3BD6C4C5CCE939F0C99779B8203F737A54E7DEE733013F472D5535383601EE326804CFEAD6D00986D022B3F4D70C6FEC6F3D19B00E8A&guid=2393653650&uin=772528797&fromtag=66",
			"singername": "Alan Walker / Iselin Solheim",
			"songname": "Faded",
			"albumpic": "https://y.gtimg.cn/music/photo_new/T002R300x300M000002Nt51E0q8Zoo.jpg?max_age=2592000"
		},
		{
			"url": "http://dl.stream.qqmusic.qq.com/C400000FR5GV0lwW18.m4a?vkey=38D630EB5D436194CAF1EE9F9AA66B721F62F5705747316D40650234FBE29CB73899A0611D5B4339569D7F0876475E243FC961C8DE20186B&guid=2393653650&uin=772528797&fromtag=66",
			"singername": "赵雷",
			"songname": "成都",
			"albumpic": "https://y.gtimg.cn/music/photo_new/T002R300x300M000000jE4g74VS43p.jpg?max_age=2592000"
		},
		{
			"url": "http://dl.stream.qqmusic.qq.com/C400001Qu4I30eVFYb.m4a?vkey=345F57FDDFD13A2D7891DBFFC7C354CB2EF2BC114D3AB8E47BF0CE7AD89311725D2F1F512BA5B9745A70FF845505F422836025A1D712D710&guid=2393653650&uin=772528797&fromtag=66",
			"singername": "薛之谦",
			"songname": "演员",
			"albumpic": "https://y.gtimg.cn/music/photo_new/T002R300x300M000003y8dsH2wBHlo.jpg?max_age=2592000"
		}
	];
	return {
    	musicList: list
	};
});