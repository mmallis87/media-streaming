import { get } from 'lodash';
import React, { useMemo } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

const Image = ({ src, alt, ...props }) => {
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { internal: { mediaType: { regex: "/image/" } } }) {
        nodes {
          relativePath
          childImageSharp {
            fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
      }
    }
  `);

  const match = useMemo(
    () => data.allFile.nodes.find(({ relativePath }) => src === relativePath),
    [data, src],
  );

  const fluid = get(match, 'childImageSharp.fluid');

  return fluid ? (
    <Img fluid={fluid} Tag="div" alt={alt} {...props} />
  ) : (
    <img src={src.replace('http:', 'https:')} alt={alt} {...props} />
  );
};

export default Image;
