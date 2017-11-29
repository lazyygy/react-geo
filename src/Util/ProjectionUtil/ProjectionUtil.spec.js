/*eslint-env jest*/
import sinon from 'sinon';
import proj4 from 'proj4';
import OlProjection from 'ol/proj';

import ProjectionUtil from './ProjectionUtil.js';

describe('ProjectionUtil', () => {

  const testCrsDefinition = {
    'EPSG:25832': '+proj=utm +zone=32 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
  };

  const testCrsMappings = {
    'urn:ogc:def:crs:EPSG::3857': 'EPSG:3857',
    'urn:ogc:def:crs:EPSG::25832': 'EPSG:25832'
  };

  describe('Basic test', () => {
    it('is defined', () => {
      expect(ProjectionUtil).not.toBeUndefined();
    });
  });

  describe('Static methods', () => {
    describe('#initProj4Definitions', () => {
      it('is defined', () => {
        expect(ProjectionUtil.initProj4Definitions).not.toBeUndefined();
      });
      it('it registers the given CRS definitions in proj4 and ol', () => {
        const proj4Spy = sinon.spy(proj4, 'defs');
        const olSpy = sinon.spy(OlProjection, 'setProj4');

        ProjectionUtil.initProj4Definitions(testCrsDefinition);
        expect(proj4Spy).toHaveProperty('callCount', 1);
        expect(olSpy).toHaveProperty('callCount', 1);

        proj4.defs.restore();
        OlProjection.setProj4.restore();
      });
    });

    describe('#initProj4DefinitionMappings', () => {
      it('is defined', () => {
        expect(ProjectionUtil.initProj4DefinitionMappings).not.toBeUndefined();
      });
      it('it registers the given CRS mappings in proj4', () => {
        const proj4Spy = sinon.spy(proj4, 'defs');

        ProjectionUtil.initProj4DefinitionMappings(testCrsMappings);
        expect(proj4Spy).toHaveProperty('callCount', 4);

        proj4.defs.restore();
      });
    });
  });

});
