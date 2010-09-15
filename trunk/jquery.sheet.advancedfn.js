jQuery.sheet.advancedfn = {
	FACTORIAL: function(n){
		fact = 1;
		for (i = n; i > 0; i--) 
			fact *= i;
		return fact;
	},
	COMBINATION: function(n, k){
	   return this.FACTORIAL(n) / this.FACTORIAL(k) / this.FACTORIAL(n - k);
	},
	PERMUTATION: function(n, r){
		return this.FACTORIAL(n) / this.FACTORIAL(n - r);
	},
	GAMMA: function(x){
		if (x > 0) {
			if (x != Math.floor(x)) {
				with (Math) {
					var v = 1;
					while (x < 8) {
						v *= x;
						x++
					}
					var w = 1 / (x * x);
					return exp(((((((((-3617 / 122400) * w + 7 / 1092) * w -
					691 / 360360) *
					w +
					5 / 5940) *
					w -
					1 / 1680) *
					w +
					1 / 1260) *
					w -
					1 / 360) *
					w +
					1 / 12) /
					x +
					0.5 * log(2 * PI) -
					log(v) -
					x +
					(x - 0.5) * log(x));
				}
			}
			else {
				return this.FACTORIAL(x - 1);
			}
		}
		return false;
	},
	PRECISION: function(x, eps){
		var dec = Math.pow(10, Math.floor(Math.log(1 / eps) * Math.LOG10E));
		return Math.round(dec * x) / dec;
	},
	MINIMUM: function(arr){
		var min = arr[0];
		for (i = 0; i < arr.length; i++) {
			if (arr[i] < min) {
				min = arr[i];
			}
		}
		return min;
	},
	MODE: function(arr){
		var arrsort = arr.sort(function(a, b){
			return a - b;
		});
		var count = 1;
		var position = 0;
		var frequencies = [];
		var values = [];
		for (i = 0; i < arrsort.length; i++) {
			if (arrsort[i] == arrsort[i + 1]) {
				count++
			}
			else {
				frequencies[position] = count;
				values[position] = arrsort[i];
				position++;
				count = 1;
			}
		}
		var max = frequencies[0];
		for (i = 0; i < frequencies.length; i++) {
			if (frequencies[i] > max) {
				max = frequencies[i];
				position = i;
			}
		}
		return values[position];
	},
	MAXIMUM: function(arr){
		var max = arr[0];
		for (i = 0; i < arr.length; i++) {
			if (arr[i] > max) {
				max = arr[i];
			}
		}
		return max;
	},
	MEAN: function(arr){
		return this.SUM(arr) / arr.length;
	},
	SUM: function(arr){
		var sum = 0;
		for (i = 0; i < arr.length; i++) {
			sum += arr[i]
		}
		return sum;
	},
	MEDIAN: function(arr){
		var arrsort = arr.sort(function(a, b){
			return a - b;
		})
		return arrsort[Math.round((arr.length) / 2) - 1];
	},
	QUARTILES: function(arr){
		var arrsort = arr.sort(function sortNumber(a, b){
			return a - b;
		});
		return [arrsort[Math.round((arrsort.length) / 4) - 1], arrsort[Math.round((arrsort.length) / 2) - 1], arrsort[Math.round((arrsort.length) * 3 / 4) - 1]];
	},
	VARIANCE: function(arr){
		var sq_dev = [];
		var u = this.MEAN(arr);
		for (i = 0; i < arr.length; i++) {
			sq_dev[i] = Math.pow(arr[i] - u, 2);
		}
		return this.SUM(sq_dev) / arr.length;
	},
	MEANDEV: function(arr){
		var dev = [];
		var u = this.SUM(arr);
		for (i = 0; i < arr.length; i++) {
			dev[i] = Math.abs(arr[i] - u);
		}
		
		return this.SUM(dev) / arr.length;
	},
	STDEV: function(arr){
		return Math.sqrt(this.VARIANCE(arr));
	},
	COVARIANCE: function(arr1, arr2){
		var u = this.MEAN(arr1);
		var v = this.MEAN(arr2);
		var sq_dev = [];
		for (i = 0; i < arr1.length; i++) {
			sq_dev[i] = (arr1[i] - u) * (arr2[i] - v);
		}
		return this.SUM(sq_dev) / arr1.length;
	},
	CORR_COEFF: function(arr1, arr2){
		return jQuery.covariance(arr1, arr2) / jQuery.stdev(arr1) / jQuery.stdev(arr2);
	},
	UNIFORMCDF: function(a, b, x){
		if (x < a) {
			return 0;
		}
		else {
			if (x < b) {
				return (x - a) / (b - a);
			}
		}
		return 1;
	},
	BINOMIAL: function(n, p, k){
		return this.COMBINATION(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
	},
	BINOMIALCDF: function(n, p, x){
		if (x < 0) {
			return 0;
		}
		var binomarr = [];
		for (k = 0; k < n; k++) 
			binomarr[k] = this.BINOMIAL(n, p, k);
		if (x < n) {
			var sum = 0;
			for (i = 0; i <= x; i++) 
				sum += binomarr[i];
			return sum;
		}
		return 1;
	},
	NEGBIN: function(r, p, x){
		if (x != Math.floor(x)) {
			return false;
		}
		if (x < 0) {
			return 0;
		}
		else {
			return this.COMBINATION(x + r - 1, r - 1) * Math.pow(p, r) * Math.pow(1 - p, x);
		}
	},
	NEGBINCDF: function(n, p, x){
		if (x < 0) {
			return 0;
		}
		var sum = 0;
		for (k = 0; k <= x; k++) {
			sum += jQuery.negbin(n, p, k);
		}
		return sum;
	},
	HYPGEOM: function(N, m, n, x){
		if (x != Math.floor(x)) {
			return false;
		}
		if (x < 0) {
			return 0;
		}
		else {
			return this.COMBINATION(m, x) * this.COMBINATION((N - m), n - x) / this.COMBINATION(N, n);
		}
	},
	HYPGEOMCDF: function(N, m, n, x){
		if (x < 0) {
			return 0;
		}
		var sum = 0;
		for (k = 0; k <= x; k++) 
			sum += this.HYPGEOM(N, m, n, k);
		return sum;
	},
	EXPONENTIALCDF: function(l, x){
		return 1 - Math.exp(-l * x);
	},
	POISSON: function(l, x){
		return Math.pow(l, x) * Math.exp(-l) / this.FACTORIAL(x)
	},
	POISSONCDF: function(l, x){
		if (x < 0) {
			return 0;
		}
		var sum = 0;
		for (k = 0; k <= x; k++) 
			sum += jQuery.poisson(l, k);
		return sum;
	},
	NORMCDF: function(u, s, t){
		return jQuery.asr(Function("x", "return Math.exp(-Math.pow(x-" + u + ",2)/Math.pow(" + s + ",2)/2)/" + s + "/Math.sqrt(2*Math.PI)"), 0, t, 1e-14);
	},
	LINEAR_REQ_EQ: function(arrf, arrx){
		var u = jQuery.mean(arrf);
		var v = jQuery.mean(arrx);
		var sq_dev = [];
		var devx = [];
		for (i = 0; i < arrf.length; i++) {
			sq_dev[i] = (arrf[i] - u) * (arrx[i] - v);
			devx[i] = Math.pow(arrx[i] - v, 2);
		}
		var linear_eq_coeff = jQuery.sum(sq_dev) / jQuery.sum(devx);
		var linear_eq_const = u - linear_eq_coeff * v;
		return Function("x", "return " + linear_eq_coeff + "*x+" + linear_eq_const);
	},
	EXP_REG_EQ: function(arrf, arrx){
		for (i = 0; i < arrf.length; i++) {
			(arrf[i] = Math.log(arrf[i]));
		}
		var u = jQuery.mean(arrf);
		var v = jQuery.mean(arrx);
		var sq_dev = [];
		var devx = [];
		for (i = 0; i < arrf.length; i++) {
			sq_dev[i] = (arrf[i] - u) * (arrx[i] - v);
			devx[i] = Math.pow(arrx[i] - v, 2);
		}
		var exp_coeff = jQuery.sum(sq_dev) / jQuery.sum(devx);
		var exp_const = Math.exp(u - exp_coeff * v);
		return Function("x", "return Math.exp(" + exp_coeff + "*x)*" + exp_const);
	},
	SECANTMETHOD: function(func, min, max, error, maxiter){
		var d;
		for (n = 1; n <= maxiter; n++) {
			var fmx = func(max);
			d = (max - min) / (fmx - func(min)) * fmx;
			if (Math.abs(d) < error) {
			
				return max;
			}
			min = max;
			max = max - d;
		}
		return max;
	},
	FIVEPT: function(func, x, h){
		return (-func(x + h * 2) + 8 * func(x + h) - 8 * func(x - h) + func(x - h * 2)) / h / 12;
	},
	FCRIT: function(f, a, b){
		return this.PRECISION(this.SECANTMETHOD(Function("t", "return jQuery.fivept(" + f + ",t,1e-3)"), a, b, 1e-13, 99999), 1e-12)
	},
	ASR: function(f, a, b, eps){
		var c = (a + b) / 2;
		var h = (b - a) / 6;
		var fa = f(a);
		var fb = f(b);
		var fc = f(c);
		var recursive_asr = function(f, a, b, c, eps, sum, fa, fb, fc){
			var cl = (a + c) / 2;
			var cr = (c + b) / 2;
			var h = (c - a) / 6;
			var fcr = f(cr);
			var fcl = f(cl);
			var left = (fa + 4 * fcl + fc) * h;
			var right = (fc + 4 * fcr + fb) * h;
			if (Math.abs(left + right - sum) <= 15 * eps) {
				return left + right + (left + right - sum) / 15;
			}
			return recursive_asr(f, a, c, cl, eps / 2, left, fa, fc, fcl) + recursive_asr(f, c, b, cr, eps / 2, right, fc, fb, fcr);
		}
		return this.PRECISION(recursive_asr(f, a, b, c, eps, h * (fa + fb + 4 * fc), fa, fb, fc), eps);
	}
}
