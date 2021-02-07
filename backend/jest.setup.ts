import * as chai from 'chai';
import deepEqualInAnyOrder from 'deep-equal-in-any-order';
import chaiAsPromised from 'chai-as-promised';
import chaiSinon from 'sinon-chai';

chai.use(chaiAsPromised);
chai.use(deepEqualInAnyOrder);
chai.use(chaiSinon);
