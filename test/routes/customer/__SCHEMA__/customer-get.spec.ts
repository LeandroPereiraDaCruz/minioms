import { expect, should } from 'chai';
import { BAD_REQUEST, CONFLICT, CREATED, OK, NOT_FOUND } from 'http-status';
import { chai, server } from '../../index.spec';
import jsonSchemaErrorGet from './__SCHEMA__/errors/jsonSchemaErrorGet.json';
import jsonSchemaErrorGetQuery from './__SCHEMA__/errors/jsonSchemaErrorGetById.json';
import jsonSchemaSuccessGet from './__SCHEMA__/success/jsonSchemaSuccessGet.json';

// https://www.jsonschema.net/home