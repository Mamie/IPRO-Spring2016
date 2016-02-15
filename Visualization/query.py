import cirpy
import argparse
import os
from urllib2 import HTTPError, URLError

# resolve iupac name of the SMILES string
def iupac( SMILES ):
    name = None
    try:
        name = cirpy.resolve( SMILES, 'iupac_name' )
    except HTTPError, e:
        print "HTTPError: %s"%e.code
    except URLError, e:
        print "The server might be down... URLError: " %e.args
    return name

# resolve the mol file of given SMILES string
def MOL( SMILES ):
    molfile = None
    try:
        molfile = cirpy.resolve( SMILES, 'mol' )
    except HTTPError, e:
        print "HTTPError: %s "%e.code
    except URLError, e:
        print "The server might be down... URLError: %s"%e.args
    return molfile

# display the 3D model in pymol
def pymol_show( infile ):
    os.system( 'pymol -ex "%s"' %infile )
    os.remove( infile )

# unit testing; python query.py SMILES_string
if __name__=='__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('SMILES', help='SMILES string for molecule')
    args = parser.parse_args()
    molfile = MOL( args.SMILES )
    if not molfile == None:
        name = iupac( args.SMILES )
        filename = name + '.mol' if not name==None else args.SMILES+'.mol'
        print molfile
        #with open( filename, 'w+' ) as infile:
        #    infile.write( molfile )
        #pymol_show( filename )
    else:
        print 'SMILES string cannot be resolved'


