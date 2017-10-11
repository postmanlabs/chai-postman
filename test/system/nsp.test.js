/**
 * @fileOverview Ensures nsprc is as expected
 */

var _ = require('lodash'),
    expect = require('chai').expect,
    fs = require('fs');

/* global describe, it, before */
describe('nsp', function () {
    var nsprc,
        pkg;

    before(function () {
        nsprc = JSON.parse(fs.readFileSync('./.nsprc').toString());
        pkg = JSON.parse(fs.readFileSync('./package.json').toString());
    });

    it('must be a dev dependency', function () {
        expect(pkg.devDependencies && pkg.devDependencies.nsp).to.be.ok;
    });

    describe('nsprc', function () {
        it('must exist', function () {
            expect(nsprc).to.be.ok;
        });

        it('must not have any exclusion', function () {
            expect(nsprc.exceptions).to.eql([]);
        });

        it('must exclude only a known set of packages (prevent erroneous exclusions)', function () {
            expect(nsprc.exclusions).to.eql({
                'postman-collection': '3.0.0'
            });
        });

        it('dependency version in package.json should match .nsprc (time to remove exclusion?)', function () {
            var pkg = _.pick(require('../../package').dependencies, _.keys(nsprc.exclusions));
            expect(pkg).to.eql(nsprc.exclusions);
        });
    });
});
